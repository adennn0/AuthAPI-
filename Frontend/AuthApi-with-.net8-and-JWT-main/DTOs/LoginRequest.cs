using System.ComponentModel.DataAnnotations;

namespace AuthApi.DTOs
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email zorunludur")]
        [EmailAddress(ErrorMessage = "Geçerli bir email adresi giriniz")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre zorunludur")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}