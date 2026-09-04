using Hackathon.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hackathon.Api.Data.Configurations
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.RecipientName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.RecipientContact).IsRequired().HasMaxLength(100);

            builder.HasOne(x => x.FoodListing)
                   .WithMany(x => x.Reservations)
                   .HasForeignKey(x => x.FoodListingId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
