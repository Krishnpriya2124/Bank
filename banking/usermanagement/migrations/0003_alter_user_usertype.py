# Generated by Django 4.2.7 on 2023-11-24 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0002_alter_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='usertype',
            field=models.CharField(default='customer', max_length=10),
        ),
    ]