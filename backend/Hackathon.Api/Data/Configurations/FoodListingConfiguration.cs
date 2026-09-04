using Hackathon.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hackathon.Api.Data.Configurations
{
    public class FoodListingConfiguration : IEntityTypeConfiguration<FoodListing>
    {
        public void Configure(EntityTypeBuilder<FoodListing> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(150);
            builder.Property(x => x.Description).IsRequired().HasMaxLength(1000);
            builder.Property(x => x.Category).IsRequired().HasMaxLength(50);
            builder.Property(x => x.PickupLocation).IsRequired().HasMaxLength(200);
            builder.Property(x => x.DonorName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.DonorContact).IsRequired().HasMaxLength(100);
        }
    }
}
