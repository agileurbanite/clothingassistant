clothingassistant
=================

Getting Started
1. Clone Repository
2. Create database
3. Inject jien.sql into database
4. create 'cache' dir onto the root application directory
5. Make sure cache dir is writable by webserver
6. Create .htaccess file in public dir
SetEnv APPLICATION_ENV dev
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]
RewriteRule ^.*$ index.php [NC,L]
7. Change 'dev' on line, SetEnv APPLICATION_ENV dev to match your name
8. Edit application/config/application.ini
9. Copy [jl] section and create your own area. so for james d, it'll look like [jd : dev]
10. fill in your local db settings

ubuntu commands to run
1. sodu apt-get install lamp-server^: if lamp server has not been setup
2. sudo a2enmod rewrite: needed for rewrite engine
3. create vhost in /etc/apache/sites-enabled for clothing.local