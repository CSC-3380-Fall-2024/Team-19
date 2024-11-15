# Team-19
How to Set Up the Backend:

Step 1: Install Python Download and install Python (>=3.x) from python.org.

Step 2: Clone the Project
Pull the backend repository from GitHub:
`git clone https://github.com/Team-19/backend.git`
`cd backend`

Step 3: Set Up a Virtual Environment
Create a virtual environment:
`python -m venv venv`

Activate the virtual environment:
- Mac/Linux: `source venv/bin/activate`
- Windows: `venv\Scripts\activate`

Step 4: Install Dependencies
Install the required Python packages:
`pip install -r requirements.txt`


Step 6: Set Up the Database
Run migrations to initialize the database schema:
- `python manage.py makemigrations`
- `python manage.py migrate`

Step 7: Run the Development Server
Start the server:
`python manage.py runserver`
