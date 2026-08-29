from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import re

app = Flask(__name__)
app.secret_key = "studyfocus-secret-key-change-this"


# -----------------------------
# DATABASE
# -----------------------------

def get_db():
    connection = sqlite3.connect("studyfocus.db")
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    db = get_db()
    try:
        db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        """)
        db.commit()
    finally:
        db.close()


# Ensure the database exists before any route is used.
init_db()


# -----------------------------
# LOGIN
# -----------------------------

@app.route("/")
def home():

    if "user_id" in session:
        return redirect(url_for("dashboard"))

    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        if not email or not password:
            return render_template(
                "login.html",
                error="Please enter email and password."
            )

        db = get_db()

        user = db.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        db.close()

        if user and check_password_hash(
            user["password"],
            password
        ):

            session["user_id"] = user["id"]
            session["user_name"] = user["name"]
            session["user_email"] = user["email"]

            return redirect(url_for("dashboard"))

        return render_template(
            "login.html",
            error="Invalid email or password."
        )

    return render_template("login.html")


# -----------------------------
# REGISTER
# -----------------------------

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        confirm = request.form.get("confirm", "")

        email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"

        if not name:
            return render_template(
                "register.html",
                error="Please enter your name."
            )

        if not re.match(email_pattern, email):
            return render_template(
                "register.html",
                error="Please enter a valid email."
            )

        if len(password) < 6:
            return render_template(
                "register.html",
                error="Password must contain at least 6 characters."
            )

        if password != confirm:
            return render_template(
                "register.html",
                error="Passwords do not match."
            )

        db = get_db()

        existing_user = db.execute(
            "SELECT id FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if existing_user:

            db.close()

            return render_template(
                "register.html",
                error="An account with this email already exists."
            )

        hashed_password = generate_password_hash(password)

        db.execute(
            """
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            """,
            (name, email, hashed_password)
        )

        db.commit()
        db.close()

        return redirect(url_for("login"))


    return render_template("register.html")


# -----------------------------
# DASHBOARD
# -----------------------------

@app.route("/dashboard")
def dashboard():

    if "user_id" not in session:
        return redirect(url_for("login"))

    return render_template(
        "dashboard.html",
        name=session["user_name"],
        email=session["user_email"]
    )


# -----------------------------
# LOGOUT
# -----------------------------

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("login"))


# -----------------------------
# RUN
# -----------------------------

if __name__ == "__main__":

    init_db()

    app.run(
        debug=True
    )