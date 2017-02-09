
class User < ApplicationRecord
  has_secure_password

  validates :username, {uniqueness: true, presence: true, case_sensitive: false}
  validates :password, length: { minimum: 12 }

  validate :password_must_contain_number

  def password_must_contain_number
    unless !!(password =~ /\d/)
      errors.add(:password, "must contain at least one number")
    end
  end

  

end
