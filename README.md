# hotels-around-service

# Installation
* Create an empty folder, and navigate to it.
* clone the repository

```shell
$ git clone https://github.com/azizcruz/hotels-around-service.git .

```

* navigate to backend
```shell
$ cd back-end/
```

* we are using virtualenv to create a virtual environment, run the following command to create one and then run server
```shell
$ virtualenv -p python3 virtualenv; source virtualenv/bin/activate; pip install -r requirments.txt; python manage.py runserver
```

* Open a new terminal tab in the same directory and run
```shell
$ cd ..; cd front-end; npm install; npm start
```

* Open your browser and paste http://localhost:3000

Now you can use the app.

## Admin site

* open new tab in your browser and paste http://localhost:8000/admin/
* if it asks for authentication just write
Username: limehome
Password: 1234
and log in then a page with the data available will be returned.

## Run tests
currently the tests are only in the backend, you can run them using the following.
first navigate to the base of the project directory then run.
```shell
$ cd backend; python manage.py test
```
