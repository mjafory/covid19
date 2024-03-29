// Declare the variables and objects
        let new_cases = document.getElementById("new_case");
        let new_death = document.getElementById("new_death");
        let total_death = document.getElementById("total_death");
        let total_recovered = document.getElementById("total_recovered");
        let total_cases = document.getElementById("total_cases");
        let table = document.getElementById('countries_stat');

        // Function to fetch and display global data
        function fetchGlobalData() {
            fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': 'edd2277260mshf152755896d31e4p195aadjsn63b6c16d27fd',
                    'X-RapidAPI-Host': 'coronavirus-monitor.p.rapidapi.com'
                }
            })
            .then(response => response.json().then(data => {
                console.log(data);
                total_cases.innerHTML = data["Total Cases_text"];
                new_cases.innerHTML = data["New Cases_text"];
                new_death.innerHTML = data["New Deaths_text"];
                total_death.innerHTML = data["Total Deaths_text"];
                total_recovered.innerHTML = data["Total Recovered_text"];
            }))
            .catch(err => {
                console.log(err);
            });
        }

        // Function to fetch and display country-specific data
        function fetchCountryData() {
            fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': 'edd2277260mshf152755896d31e4p195aadjsn63b6c16d27fd',
                    'X-RapidAPI-Host': 'coronavirus-monitor.p.rapidapi.com'
                }
            })
            .then(response => response.json().then(data => {
                console.log(data);
                let countries_stat = data.countries_stat;

                // Getting all the country statistics using a loop
                for (let i = 0; i < countries_stat.length; i++) {
                    console.log(countries_stat[i]);
                    // Inserting new rows inside the table
                    let row = table.insertRow(i + 1);
                    let country_name = row.insertCell(0);
                    let cases = row.insertCell(1);
                    let deaths = row.insertCell(2);
                    let recovered_per_country = row.insertCell(3);
                    let new_cases = row.insertCell(4);
                    let new_deaths = row.insertCell(5);
                    country_name.innerHTML = countries_stat[i].country_name;
                    cases.innerHTML = countries_stat[i].cases;
                    deaths.innerHTML = countries_stat[i].deaths;
                    recovered_per_country.innerHTML = countries_stat[i].total_recovered;
                    new_cases.innerHTML = countries_stat[i].new_cases;
                    new_deaths.innerHTML = countries_stat[i].new_deaths;
                }
            }))
            .catch(err => {
                console.log(err);
            });
        }

        // Function to fetch and display historical data based on the selected date
        function fetchHistoricalData() {
            // Get the selected date from the input element
            const selectedDate = document.getElementById("datePicker").value;

            // Construct the API URL with the selected date
            const apiUrl = `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php`;

            fetch(apiUrl, {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': 'edd2277260mshf152755896d31e4p195aadjsn63b6c16d27fd',
                    'X-RapidAPI-Host': 'coronavirus-monitor.p.rapidapi.com'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                console.log(data);
                let countries_stat = data.countries_stat;
                // Process and display the historical data here
                for (let i = 0; i < countries_stat.length; i++) {
                    console.log(countries_stat[i]);
                    // Inserting new rows inside the table
                    let row = table.insertRow(i + 1);
                    let country_name = row.insertCell(0);
                    let cases = row.insertCell(1);
                    let deaths = row.insertCell(2);
                    let recovered_per_country = row.insertCell(3);
                    let new_cases = row.insertCell(4);
                    let new_deaths = row.insertCell(5);
                    country_name.innerHTML = countries_stat[i].country_name;
                    cases.innerHTML = countries_stat[i].cases;
                    deaths.innerHTML = countries_stat[i].deaths;
                    recovered_per_country.innerHTML = countries_stat[i].total_recovered;
                    new_cases.innerHTML = countries_stat[i].new_cases;
                    new_deaths.innerHTML = countries_stat[i].new_deaths;
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        }

        // Call the function to fetch and display global data
        fetchGlobalData();

        // Call the function to fetch and display country-specific data
        fetchCountryData();