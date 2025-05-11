Here’s a list of **important `artisan` commands** in Laravel that you'll use frequently for development and maintenance:

---

## 🔧 **General Commands**

| Command                      | Description                                         |
| ---------------------------- | --------------------------------------------------- |
| `php artisan`                | List all available commands                         |
| `php artisan help [command]` | Show help for a specific command                    |
| `php artisan serve`          | Start local development server at `localhost:8000`  |
| `php artisan tinker`         | Open REPL to interact with app objects and database |

---

## 🛠 **App & Configuration**

| Command                    | Description                                 |
| -------------------------- | ------------------------------------------- |
| `php artisan config:cache` | Cache the config files (faster performance) |
| `php artisan config:clear` | Clear the config cache                      |
| `php artisan route:cache`  | Cache the route files                       |
| `php artisan route:clear`  | Clear the route cache                       |
| `php artisan view:clear`   | Clear compiled Blade views                  |
| `php artisan cache:clear`  | Clear Laravel’s application cache           |

---

## 📦 **Make (Generators)**

| Command                                         | Description                    |
| ----------------------------------------------- | ------------------------------ |
| `php artisan make:controller NameController`    | Create a new controller        |
| `php artisan make:model Post`                   | Create a model                 |
| `php artisan make:migration create_posts_table` | Create a new migration         |
| `php artisan make:seeder UsersTableSeeder`      | Create a database seeder       |
| `php artisan make:factory PostFactory`          | Create a model factory         |
| `php artisan make:middleware CheckUserRole`     | Create middleware              |
| `php artisan make:request StorePostRequest`     | Create form request validation |
| `php artisan make:command CustomCommand`        | Create custom CLI command      |

---

## 🧩 **Database**

| Command                        | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| `php artisan migrate`          | Run all migrations                             |
| `php artisan migrate:rollback` | Undo the last batch of migrations              |
| `php artisan migrate:fresh`    | Drop all tables and re-run all migrations      |
| `php artisan db:seed`          | Run database seeders                           |
| `php artisan migrate --seed`   | Migrate and seed in one go                     |
| `php artisan schema:dump`      | Create a schema dump file for faster migration |

---

## 🧪 **Testing**

| Command                                 | Description               |
| --------------------------------------- | ------------------------- |
| `php artisan test`                      | Run all tests             |
| `php artisan test --filter=ExampleTest` | Run a specific test class |

---

## 🌐 **Routes & Views**

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| `php artisan route:list` | Show all defined routes           |
| `php artisan view:cache` | Compile and cache all Blade views |

---

Do you want a **cheat sheet PDF** version of these commands or a breakdown based on use-case (like API development or admin panels)?
