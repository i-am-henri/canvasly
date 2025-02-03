# Canvasly

Canvasly is a web-based application to create and share interactive presentations. It allows you to add text, images, polls and more, together with your friends and colleagues. It's made for everyone and ment to be a funny and great tool.

## How to selfhost Canvasly

1. Install the docher engine, as well as bun.
2. Create the new database with the "./start-database.sh" script.
3. Run "bunx prisma db push" inside your terminal to push the schema to the database.
4. Run "bun start" to start the server.