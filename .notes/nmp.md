# Mysql

## Installation

**Step 1**

Download ZIP Archive from https://dev.mysql.com/downloads/mysql/

**Step 2**

Unzip and create `my.ini`:

```ini
[client]
port=3306
default-character-set = utf8
[mysql]
default-character-set = utf8
[mysqld]
port=3306

log_error = "mysql_error.log"
basedir="E:\\software\\mysql-8.0.12-winx64"

sql_mode=STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO
datadir="E:\\software\\mysql-8.0.12-winx64\\data"
collation-server = utf8_unicode_ci
init-connect='SET NAMES utf8'
character-set-server = utf8
skip-character-set-client-handshake
# Ude this because `caching_sha2_password` is not supported in mysqljs yet
default_authentication_plugin = mysql_native_password
```

**Step 3**

```bash
# Initialize database with root user and blank password
PS E:\software\mysql-8.0.12-winx64> .\bin\mysqld --initialize-insecure

# Install MySQL as a Windows service
PS E:\software\mysql-8.0.12-winx64> .\bin\mysqld --install-manual

# Start MySQL Server service
net start mysql

# Run MySQL Client
PS E:\software\mysql-8.0.12-winx64> .\bin\mysql.exe -u root

# The new `caching_sha2_password` is not supported by mysqljs yet, so we use old `mysql_native_password`
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'data4upupming!';
```

**Other Helpful commands**

```bash
# Stop MySQL Server service
net stop mysql

# Uninstall MySQL Server service
sc delete mysql
```

**MySQL cheat sheet**

```
# Insert
INSERT INTO `potluck` (`id`,`name`,`food`,`confirmed`,`signup_date`) VALUES (NULL, "John", "Casserole","Y", '2012-04-11');

# Grant privileges
GRANT ALL PRIVILEGES ON * . * TO 'root'@'localhost';

# Create user
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

## References

1. https://www.chanhvuong.com/2809/nginx-with-php-and-mysql-on-windows-7/
2. https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial
3. https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql 
4. https://stackoverflow.com/questions/49948350/phpmyadmin-on-mysql-8-0
5. https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server/51918364#51918364