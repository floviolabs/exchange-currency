# Exchange-Currency
This is a repository for the Exchange-Currency, a other currency exchange to Indonesia Rupiah (IDR) application, that retrieves exchange rate data from Bank Indonesia.

## Table of Contents

###  Description
The Exchange-Currency is designed to provide users with up-to-date exchange IDR rates from various currencies. It fetches exchange rate data from Bank Indonesia and presents it.

### Features
* Retrieve and display IDR exchange rate from other currency using data from Bank Indonesia
* View current exchange rates
* Perform currency conversion calculations

### Installation
To run the Exchange-Currency application locally, follow these steps:
1. Clone the repository:
> `git clone https://github.com/floviolabs/exchange-currency.git`
2. Navigate to the project directory:
> `cd exchange-currency`
3. Install the dependencies:
> `npm install`
4. Start the application:
> `npm run start`

### Endpoint
* Show all currency
> `http://localhost:6000/currency`
* Count exchange of currency
> `http://localhost:6000/currency-count`
* Input body JSON value
> `{ "in_currency":{currency_name}, "in_values":{currency_value} }`

### License
The Exchange-Currency application is open source and released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
