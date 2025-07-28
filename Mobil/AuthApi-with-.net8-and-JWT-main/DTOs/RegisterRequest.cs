using System.ComponentModel.DataAnnotations;

namespace AuthApi.DTOs
{
    public class RegisterRequest
    {
        // Username opsiyonel - eğer boşsa email'den otomatik oluşturulacak
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Kullanıcı adı 3-50 karakter arası olmalıdır")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Email zorunludur")]
        [EmailAddress(ErrorMessage = "Geçerli bir email adresi giriniz")]
        [StringLength(100, ErrorMessage = "Email en fazla 100 karakter olabilir")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre zorunludur")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Şifre en az 6 karakter olmalıdır")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        // ConfirmPassword opsiyonel - Flutter uygulaması bunu göndermiyor
        [DataType(DataType.Password)]
        public string? ConfirmPassword { get; set; }

        [StringLength(20, ErrorMessage = "Rol en fazla 20 karakter olabilir")]
        public string? Role { get; set; } // Opsiyonel, default "User" olacak
    }
}