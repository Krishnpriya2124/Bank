# Generated by Django 4.2.7 on 2023-11-07 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accountmanagement', '0002_alter_account_acc_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='acc_no',
            field=models.CharField(default=51851, max_length=10, unique=True),
        ),
    ]
