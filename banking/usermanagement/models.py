from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password

class User(AbstractUser):
    # type=(('manager','manager'),
    #       ('staff','staff'),
    #       ('customer','customer'))
    
    usertype = models.CharField(max_length=10,choices=type)
    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)
    
