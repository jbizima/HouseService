# Home_Service_Project


# Home Service Application

## Overview

International students, particularly first-year students, face significant challenges in adapting to their new environment. One critical issue is the inability to access reliable and trustworthy home services, such as repairs and maintenance, due to a lack of familiarity with local systems and cultural nuances. This results in students wasting time, experiencing stress, and potentially falling victim to unreliable service providers.

The Home Service platform with a centralized service platform or directory for for various home-related tasks such as cleaning, repairs, and maintenance nearby. Thus, directly addresses these challenges by providing a user-friendly digital solution where users can browse available services, book appointments, and engage with service providers seamlessly. The platform enhances efficiency by integrating authentication, calendar scheduling, real-time admin dashboards, and automated notifications, ensuring smooth interactions between service providers and customers. 


## Features

### For Users
- **Browse Services**: Discover various home services offered by providers.
- **Search**: Find services based on various service categories.
- **Booking**: Schedule and book appointments with service providers.
- **Provider Profiles**: View detailed profiles including ratings and reviews.
- **Appointment Management**: Track and manage bookings.


### For Service Providers
- **Profile Management**: Create and manage service provider profile.
- **Service Approval**: Review and approve service listings.
- **Booking Management**: Manage appointments and bookings.
- **Reporting**: Access reports on service usage, user activity, and provider performance.


### For Admins
- **User Management**: Manage user and provider accounts, including registration and deactivation.
- **Service Listings**: Add, update, or remove services you offer.
- **Service Providers**: Add, update, or remove services providers.
- **Reporting**: Access reports on service usage, user activity, and provider performance.

## Installation

### Prerequisites
- [Python](https://www.python.org/) (version 3.6 or higher)
- [Django](https://www.djangoproject.com/) (version 3.2 or higher)


### Getting Started

1. **Clone the Repository**
    ```bash
    git clone https://github.com/jbizima/HouseService.git
    ```

2. **Create a Virtual Environment**
    ```bash
    python -m venv venv
    ```

3. **Activate the Virtual Environment**
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

4. **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

5. **Apply Migrations**
    ```bash
    python manage.py migrate
    ```

6. **Create a Superuser (for Admin Access)**
    ```bash
    python manage.py createsuperuser
    ```

7. **Run the Application**
    ```bash
    python manage.py runserver
    ```
   The back-end of the application will be available at ` http://127.0.0.1:8000/`.

## Usage

- **User Access**: Sign up or log in to browse services and book appointments.
- **Service Provider Access**: Register to approve or decline appointments and manage bookings.
- **Admin Access**: Log in to manage users, providers, and services.

## Contributing

We welcome contributions to improve the Home Services Application. To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [j.bizima@alustudent.com](mailto:j.bizima@alustudent.com).