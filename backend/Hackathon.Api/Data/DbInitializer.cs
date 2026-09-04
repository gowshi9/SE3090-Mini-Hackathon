using Hackathon.Api.Models.Entities;

namespace Hackathon.Api.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            if (context.FoodListings.Any())
            {
                return; // DB has been seeded
            }

            var listings = new List<FoodListing>
            {
                new()
                {
                    Title = "Fresh Bread Packets",
                    Description = "Freshly baked artisanal sandwich loaves and dinner rolls from afternoon batch. Cleanly packaged and sealed in eco-friendly paper bags.",
                    Category = "Bakery",
                    Quantity = 20,
                    Unit = "portions",
                    PickupLocation = "Jaffna Town",
                    ExpiryDate = DateTime.UtcNow.AddHours(6),
                    Status = "Available",
                    DonorName = "Kavindi Perera",
                    DonorContact = "kavindi.p@univ.ac.lk",
                    ImageUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
                    CreatedAt = DateTime.UtcNow.AddHours(-1)
                },
                new()
                {
                    Title = "Vegetable Rice Packs",
                    Description = "Nutritious individual lunch boxes with steamed samba rice, dhal curry, and fresh gotukola sambol.",
                    Category = "Cooked Meals",
                    Quantity = 15,
                    Unit = "portions",
                    PickupLocation = "Colombo 03",
                    ExpiryDate = DateTime.UtcNow.AddHours(4),
                    Status = "Available",
                    DonorName = "Kavindi Perera",
                    DonorContact = "kavindi.p@univ.ac.lk",
                    ImageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
                    CreatedAt = DateTime.UtcNow.AddHours(-2)
                },
                new()
                {
                    Title = "Banana Bunches",
                    Description = "10 bunches of naturally ripened Ambul & Seeni bananas from our organic farm harvest.",
                    Category = "Fruits & Vegetables",
                    Quantity = 10,
                    Unit = "portions",
                    PickupLocation = "Kandy Central",
                    ExpiryDate = DateTime.UtcNow.AddHours(8),
                    Status = "Reserved",
                    DonorName = "Kavindi Perera",
                    DonorContact = "kavindi.p@univ.ac.lk",
                    ImageUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
                    CreatedAt = DateTime.UtcNow.AddHours(-3)
                },
                new()
                {
                    Title = "Mixed Vegetable Curry & Roti",
                    Description = "Whole wheat godamba rotis with aromatic mixed vegetable curry from lunch catering surplus.",
                    Category = "Rice & Curry",
                    Quantity = 25,
                    Unit = "portions",
                    PickupLocation = "Galle Fort",
                    ExpiryDate = DateTime.UtcNow.AddHours(-1),
                    Status = "Collected",
                    DonorName = "Kavindi Perera",
                    DonorContact = "kavindi.p@univ.ac.lk",
                    ImageUrl = "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80",
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                }
            };

            context.FoodListings.AddRange(listings);
            context.SaveChanges();
        }
    }
}
