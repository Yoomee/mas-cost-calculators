Before('@logged_in') do
  step "I am logged in"
end

After do |scenario|
  if scenario.status == :failed
    save_and_open_page
  end
end