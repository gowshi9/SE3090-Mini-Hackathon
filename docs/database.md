# Database Schema

## Entities

### 1. FoodListing
- `Id`: int (Primary Key)
- `Title`: string
- `Description`: string
- `Category`: string
- `Quantity`: int
- `Unit`: string (e.g. "kg", "servings", "items")
- `PickupLocation`: string
- `ExpiryDate`: DateTime
- `Status`: string ("Available", "Reserved", "Completed", "Expired")
- `DonorName`: string
- `DonorContact`: string
- `CreatedAt`: DateTime

### 2. Reservation
- `Id`: int (Primary Key)
- `FoodListingId`: int (Foreign Key -> FoodListing)
- `RecipientName`: string
- `RecipientContact`: string
- `Status`: string ("Pending", "Confirmed", "Cancelled", "Fulfilled")
- `ReservedAt`: DateTime
- `Notes`: string
