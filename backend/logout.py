from flask import Flask, request, redirect, url_for

app = Flask(__name__)

@app.route('/logout', methods=['POST'])
def logout():
    # Clear session data or perform any necessary logout operations
    # For example, if using Flask-Login:
    # logout_user()

    # Redirect to the login page
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)