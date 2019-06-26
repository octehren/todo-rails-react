FactoryBot.define do
  factory :to_do do
    title { FFaker::Lorem.characters(rand(101..255)) }
    username { FFaker::Name.first_name }
    description { FFaker::Lorem.sentence(rand(2..5)) }
  end
end
