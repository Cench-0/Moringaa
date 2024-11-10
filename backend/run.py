from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode for development; turn off for production
