from django.urls import path
from .views import *

urlpatterns = [
    path("user/register/", CreateUserAPIView.as_view(), name="user_create"),
    path("auth/user/", UserProfileAPIView.as_view(), name="user_detail"),
    path("google/validate_token/", validate_google_token, name="validate_token"),
    path("logout_user/", LogoutUserView.as_view(), name="logout"),
    path("categories/", ServiceCategoryList.as_view(), name="view_categories"),
    path(
        "categories/no_pagination/",
        ServiceCategoryListNoPagination.as_view(),
        name="view_categories_no_pagination",
    ),
    path(
        "categories/create/",
        CreateServiceCategoryAPIView.as_view(),
        name="add_category",
    ),
    path(
        "categories/<int:category_id>",
        ServiceCategoryDetails.as_view(),
        name="view_category",
    ),
    path(
        "categories/delete/<int:category_id>",
        ServiceCategoryDelete.as_view(),
        name="delete_category",
    ),
    path(
        "categories/update/<int:category_id>",
        ServiceCategoryUpdate.as_view(),
        name="update_category",
    ),
    path(
        "category/image/update/<int:image_id>",
        CategoryImageUpdate.as_view(),
        name="update_category_image",
    ),
    path("category/image/add/", CategoryImageAdd.as_view(), name="add_category_image"),
    path("services/", ServiceList.as_view(), name="view_services"),
    path("services/filter/", ServiceListFilter.as_view(), name="view_services_filter"),
    path(
        "services/no_pagination/",
        ServiceListNoPagination.as_view(),
        name="view_services_no_page",
    ),
    path("services/create/", CreateServiceAPIView.as_view(), name="add_service"),
    path("services/<int:service_id>", ServiceDetails.as_view(), name="view_service"),
    path(
        "services/delete/<int:service_id>",
        ServiceDelete.as_view(),
        name="delete_service",
    ),
    path(
        "services/update/<int:service_id>",
        ServiceUpdate.as_view(),
        name="update_service",
    ),
    path("workers/", WorkerList.as_view(), name="view_workers"),
    path("workers/reports/", WorkerReportList.as_view(), name="view_workers_reports"),
    path("workers/reports/print/", WorkerReportListPrint.as_view(), name="view_workers_reports_print"),
    path("workers/filter/", WorkerListFilter.as_view(), name="view_workers_filter"),
    path("workers/no_pagination/", WorkerNoPagination.as_view(), name="view_workers_no_page"),
    path("workers/create/", CreateWorkerAPIView.as_view(), name="add_worker"),
    path("workers/<int:worker_id>", WorkerDetails.as_view(), name="view_worker"),
    path(
        "workers/delete/<int:worker_id>", WorkerDelete.as_view(), name="delete_worker"
    ),
    path(
        "workers/update/<int:worker_id>", WorkerUpdate.as_view(), name="update_worker"
    ),
    path("bookings/create/", CreateBookingAPIView.as_view(), name="add_booking"),
    path(
        "bookings/update/<int:booking_id>",
        BookingUpdate.as_view(),
        name="update_booking",
    ),
    path(
        "bookings/delete/<int:booking_id>",
        BookingDelete.as_view(),
        name="delete_booking",
    ),
    path("bookings/", BookingList.as_view(), name="view_bookings"),
    path("bookings/worker/", BookingListOwner.as_view(), name="view_bookings_worker"),
    path("booking/", BookingStatusList.as_view(), name="view_bookings_status"),
    path("booking/worker/", BookingWorkerStatusList.as_view(), name="view_bookings_worker_status"),
    path("bookings/worker/", BookingWorkerStatus.as_view(), name="bookings_worker_status"),
    path("bookings/get/", GetBooking.as_view(), name="get_bookings"),
    path("bookings/client/", BookingClientList.as_view(), name="get_client_bookings"),
    path("bookings/date/", BookingRangeDate.as_view(), name="get_date_bookings"),
    path("bookings/date/worker/", BookingRangeDateWorker.as_view(), name="get_date_bookings_worker"),
    path("bookings/date/print/", BookingRangeDatePrint.as_view(), name="get_date_print_bookings"),
    path("bookings/date/print/worker/", BookingRangeDatePrintWorker.as_view(), name="date_print_worker"),
    path("services/bookings/", ServiceBookings.as_view(), name="get_service_bookings"),
    path(
        "categories/bookings/",
        CategoryBookings.as_view(),
        name="get_categories_bookings",
    ),
    path("user/update/<int:user_id>", UpdateUser.as_view(), name="update_user"),
    path("user/update_password/<int:user_id>", ChangePasswordView.as_view(), name="update_user_password"),
]
