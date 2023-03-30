from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})


migrate = Migrate()
<<<<<<< HEAD
db = SQLAlchemy(metadata=metadata)
=======
db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()

>>>>>>> 999d3bdc13c63c0a7cc0653587261e6d3fcd4a9d
