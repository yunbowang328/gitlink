class MonthlyPaymentWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence do
    minutely(2)
    # monthly.day_of_month(12) #每月的12号0点执行
    # monthly.day_of_month(23).hour_of_day(20)      #每月的12号1点执行
  end

  def perform(*args)
    Sponsorship.monthly_payment
    puts Time.now, 'sponsor payment done'
  end
end