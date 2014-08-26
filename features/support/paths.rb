module NavigationHelpers
  def path_to(object)
    case object
    when CostCalculators::Partner
      "#{path_prefix}/partners/#{object.id}"
    when CostCalculators::Calculator
      "#{path_prefix}/calculators/#{object.id}"
    when String
      "#{path_prefix}#{object}"
    else
      raise "Can't find path for \"#{object}\".\n" +
      "Add a mapping in features/support/paths.rb"
    end
  end

  def path_prefix
    "/#{I18n.locale}/calculator"
  end
end

World(NavigationHelpers)
