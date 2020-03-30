# Table Reservation Manager
This web application allows students to reserve tables and admins to manage reservations. This was created to be used by CEAS Tribunal at the University of Cincinnati.

![](https://github.com/mihi-r/table-reservation-manager/workflows/Project%20CI/badge.svg)

## Use Case
### General Flow
The application will ask the user for their desired table and will generate a calendar for it. This calendar will be populated with times already reserved by other organizations (including the tentative times). The user will be allowed to select a single range of time. They will enter in their information such as their name, the organization's name, the event's title, their email, and optionally additional comments to confirm their reservation. Once the user has submitted their reservation, they will receive an email confirmation and a unique reservation ID will be generated. When reservations are intially submitted, they will be in the "tentative" stage. The reservation ID can used to track the status of their reservation. They can also use it to cancel the reservation. An admin page will created to allow an admin to approve or reject events and to perform other admin activities.
