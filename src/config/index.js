import React, { useState, useEffect } from 'react';
import SpotifyPlaylists from './SpotifyPlaylists'; // Adjust the path as needed
import { Icons } from './icons';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import WbIridescentIcon from '@material-ui/icons/WbIridescent';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ComputerIcon from '@material-ui/icons/Computer';
import CloudIcon from '@material-ui/icons/Cloud';
import InfoIcon from '@material-ui/icons/Info';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Description from '@material-ui/icons/Description';
import CircleButton from '../components/CircleButton/CircleButton'; // Adjust the path as needed

/** Common config for top section and footer */
const CommonConfig = {
    addFreePalestine: false,
    name: 'reyna patel',
    tagline: 'future software engineer(?)',
    signature: {
        viewBox: '0 0 500 500',
        signaturePathD: generateNewSignaturePathD(),
    },
    email: 'm.patelreyna2323@gmail.com',
    social: [
        {
            name: 'GitHub',
            link: 'https://github.com/9inpachi',
            icon: Icons['github']
        },
        {
            name: 'LinkedIn',
            link: 'https://linkedin.com/in/reynapatelegv'
        },
        {
            name: 'Facebook',
            link: 'https://facebook.com/9inpachi'
        },
        {
            name: 'Twitter',
            link: 'https://twitter.com/9inpachi'
        },
        {
            name: 'Email',
            link: 'mailto:m.fawaadali98@gmail.com'
        },
        {
            name: 'Resume',
            link: 'https://docs.google.com/document/d/15uVQAhsvKsreOd9Xvh9f-HGMkqpI_7dMuSKmQQvFdCo/view?usp=sharing',
            icon: <Description />
        }
    ]
};

/** Config for the projects section */
const ProjectsConfig = {
    name: 'projects',
    headerIcon: <ComputerIcon />,
    extraClass: '',
    projects: [
        {
            name: 'XGCBoost in Exoplanet Orbital Period Detection',
            icon: Icons['map'],
            description: 'Independently developed a machine learning model using XGCBoost to accurately predict the orbital periods of exoplanets based on flux data. This research involved collecting and analyzing astronomical data, implementing advanced algorithms, and ultimately writing a comprehensive paper detailing my findings and methodologies.',
            links: [
                {
                    tooltip: 'See source',
                    link: 'https://github.com/xwiki-contrib/application-interactive-maps',
                    icon: Icons['code']
                },
                {
                    tooltip: 'See app',
                    link: 'https://extensions.xwiki.org/xwiki/bin/view/Extension/InteractiveMapsApplication/',
                    icon: Icons['link']
                }
            ]
        },
        {
            name: "Artificial Intelligence's Role in Healthcare Transformation",
            icon: <SettingsInputAntennaIcon />,
            description: "Discusses AI's potential in healthcare, advancements, and ethical integration challenges.",
            links: [
                {
                    tooltip: 'See app',
                    link: 'https://hepsoftwarefoundation.org/phoenix/',
                    icon: Icons['link']
                }
            ]
        },
        {
            name: 'Project Recycode',
            icon: <WbIridescentIcon />,
            description: "Co-founded Project Recycode, a local clothing donation organization that collects and sorts clothing for donation to those in need.",
            links: [
                {
                    tooltip: 'See source',
                    link: 'https://github.com/hsf/phoenix',
                    icon: Icons['code']
                },
                {
                    tooltip: 'See app',
                    link: 'https://hepsoftwarefoundation.org/phoenix/',
                    icon: Icons['link']
                }
            ]
        },
    ]
};

const BotpressChat = () => {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        script1.async = true;

        const script2 = document.createElement('script');
        script2.src = "https://files.bpcontent.cloud/2024/10/16/15/20241016150925-37L2Z2H7.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    return (
        <div id="botpress-chat" />
    );
};

export default BotpressChat;


// WeatherSection Component
const WeatherSection = () => {
    const [weather, setWeather] = useState('');
    const [description, setDescription] = useState('');
    const [userTemp, setUserTemp] = useState(null);
    const [tempDifference, setTempDifference] = useState(null);
    const [userLocation, setUserLocation] = useState('');
    const [isSameWeather, setIsSameWeather] = useState(false);

    const apiKey = 'dece48e32b2d1335542ed99417bc254a';
    const city = 'Elk Grove Village';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch weather for Elk Grove Village
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const tempInCelsius = data.main.temp;
                const tempInFahrenheit = (tempInCelsius * 9/5) + 32; // Convert to Fahrenheit
                const conditions = data.weather[0].main.toLowerCase();
                let adjectives = '';

                if (tempInFahrenheit <= 32) adjectives = 'freezing and snowy';
                else if (tempInFahrenheit <= 50) adjectives = 'cold and cloudy';
                else if (tempInFahrenheit <= 68) adjectives = 'cool and partly cloudy';
                else if (tempInFahrenheit <= 86) adjectives = 'warm and sunny';
                else adjectives = 'hot and clear';

                if (conditions.includes('rain')) adjectives = 'rainy and wet';
                if (conditions.includes('snow')) adjectives = 'snowy and icy';
                if (conditions.includes('clouds')) adjectives = 'cloudy and cool';
                if (conditions.includes('clear')) adjectives = 'clear and warm';

                setWeather(`${adjectives} (${tempInFahrenheit.toFixed(1)}°F)`);
                setDescription(data.weather[0].description);

                // Get user location and compare temps
                navigator.geolocation.getCurrentPosition((position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;
                    const userUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${apiKey}&units=imperial`; // Fahrenheit

                    fetch(userUrl)
                        .then((response) => response.json())
                        .then((userData) => {
                            const userTempInFahrenheit = userData.main.temp;
                            const tempDiff = userTempInFahrenheit - tempInFahrenheit;
                            const location = userData.name;
                            setUserTemp(userTempInFahrenheit.toFixed(1));
                            setTempDifference(tempDiff.toFixed(1));
                            setUserLocation(location);
                            
                            // Check if the weather is the same
                            const userConditions = userData.weather[0].main.toLowerCase();
                            setIsSameWeather(conditions === userConditions && tempInFahrenheit === userTempInFahrenheit);
                        })
                        .catch((error) => console.error('Error fetching user weather:', error));
                });
            })
            .catch((error) => console.error('Error fetching weather:', error));
    }, [url]);
    return (
        <>
            <h4 style={{ fontSize: '2em' }}>{Icons['cloud']} My Weather</h4>
            <p>
                It's currently {weather} where Reyna is right now.
            </p>
            {userTemp && userLocation && (
                <p>
                    You are currently in {userLocation}, experiencing {userTemp}°F. 
                    This is {Math.abs(tempDifference)}°F {tempDifference > 0 ? 'warmer' : 'colder'} than Reyna's location.
                </p>
            )}
            {isSameWeather && (
                <p>It’s the same weather in both locations!</p>
            )}
        </>
    );
};

const StockPortfolio = () => {
    const [stockData, setStockData] = useState([]);
    const [totalGainLoss, setTotalGainLoss] = useState(0);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const apiKey = 'GYDSFWZQS1FFRVNT'; 
    const symbol = 'SPY';

    const portfolio = [
        { buyPrice: 387.16, shares: 1 },
        { buyPrice: 401.83, shares: 1.001 },
        { buyPrice: 398.75, shares: 0.008 },
        { buyPrice: 397.78, shares: 0.009 },
        { buyPrice: 408.92, shares: 10 },
        { buyPrice: 434.29, shares: 0.007 },
        { buyPrice: 435.03, shares: 8 },
        { buyPrice: 450.91, shares: 0.011 },
        { buyPrice: 440.96, shares: 5 },
        { buyPrice: 398.50, shares: 0.02 },
        { buyPrice: 482.00, shares: 0.02 },
        { buyPrice: 506.25, shares: 0.016 },
        { buyPrice: 518.89, shares: 1 },
    ];

    useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
                const data = await response.json();

                // Get the latest price from the data
                const timeSeries = data['Time Series (5min)'];
                const latestTime = Object.keys(timeSeries)[0];
                const latestPrice = parseFloat(timeSeries[latestTime]['1. open']); // Open price, change if needed

                return latestPrice;
            } catch (error) {
                console.error("Error fetching stock price:", error);
                return null;
            }
        };

        const calculatePortfolio = async () => {
            const currentPrice = await fetchCurrentPrice();
            if (currentPrice !== null) {
                let totalCost = 0;
                let totalGainLoss = 0;
                let totalPortfolioValue = 0;

                const updatedPortfolio = portfolio.map(stock => {
                    const cost = stock.buyPrice * stock.shares;
                    const currentValue = currentPrice * stock.shares;
                    const gainLoss = currentValue - cost;

                    totalCost += cost;
                    totalGainLoss += gainLoss;
                    totalPortfolioValue += currentValue;

                    return {
                        ...stock,
                        currentPrice,
                        totalCost: cost,
                        gainLoss,
                        currentValue
                    };
                });

                setStockData(updatedPortfolio);
                setTotalGainLoss(totalGainLoss);
                setPortfolioValue(totalPortfolioValue);
            }
        };

        calculatePortfolio();
    }, [apiKey, symbol]);

    return (
        <div>
            <h2>My Stock Portfolio</h2>
            <table>
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Buy Price</th>
                        <th>Current Price</th>
                        <th>Shares</th>
                        <th>Total Cost</th>
                        <th>Gain/Loss ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((stock, index) => (
                        <tr key={index}>
                            <td>{symbol}</td>
                            <td>${stock.buyPrice.toFixed(2)}</td>
                            <td>${stock.currentPrice ? stock.currentPrice.toFixed(2) : 'Loading...'}</td>
                            <td>{stock.shares.toFixed(3)}</td>
                            <td>${stock.totalCost ? stock.totalCost.toFixed(2) : 'Loading...'}</td>
                            <td>${stock.gainLoss ? stock.gainLoss.toFixed(2) : 'Loading...'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total Portfolio Value: ${portfolioValue.toFixed(2)}</h3>
            <h3>Total Gain: ${totalGainLoss.toFixed(2)}</h3>
        </div>
    );
};

/** Config for sections */
const CustomSectionsConfig = [
    {
        name: 'weather',
        headerIcon: <CloudIcon />,  
        extraClass: '',
        notInMenu: false,
        content: <WeatherSection />
    },
    {
        name: 'stocks',
        headerIcon: <ComputerIcon />,  
        extraClass: '',
        notInMenu: false,
        content: <StockPortfolio/>
    },
    {
        name: 'projects',
        headerIcon: <ComputerIcon />,
        extraClass: '',
        notInMenu: true,
        content: (
            <>
                {ProjectsConfig.projects.map((project, index) => (
                    <div key={'project-' + index}>
                        <h3 style={{ fontSize: '1.4rem' }}>{project.icon} {project.name}</h3>
                        <p>{project.description}</p>
                        <div style={{ textAlign: 'right' }}>
                            {project.links.map((link, linkIndex) => (
                                <CircleButton 
                                    key={'project-link-' + index + '-' + linkIndex} 
                                    link={link.link} 
                                    target="_blank" 
                                    tooltip={link.tooltip} 
                                    size={1.4}
                                >
                                    {link.icon}
                                </CircleButton>
                            ))}
                        </div>
                    </div>
                ))}
            </>
        )
    },
    {
        name: 'about',
        headerIcon: <InfoIcon />,
        extraClass: 'about-section section-reverse',
        content: (
            <>
                <h4>{Icons['helpoutline']} who is reyna?</h4>
                <p>A high schooler who has to somehow make this whole website over the weekend! :)</p>
                <h4>{Icons['code']} programming</h4>
                <p className="programming-icons">
                    {Icons['java']}
                    {Icons['cpp']}
                    {Icons['typescript']}
                    {Icons['javascript']}
                </p>
                <h4>{Icons['web']} web</h4>
                <p className="programming-icons">
                    {Icons['graphql']}
                    {Icons['mysql']}
                    {Icons['php']}
                    {Icons['mongodb']}
                    {Icons['nodejs']}
                    {Icons['react']}
                    {Icons['angular']}
                </p>
            </>
        )
    },
    {
        name: 'awards',
        headerIcon: <RateReviewIcon />,
        content: (
            <>
                <h2>
                <br />
                International Qualifier in Extemporaneous  Writing - Health Policy
                </h2>
                <p style={{ textAlign: 'right', fontSize: 'small' }}>
                    <i>
                        <b>HOSA - Future Health Professionals</b><br />
                        2024<br />
                    </i>
                </p>
                <h2>
                <br />
                National Finalist in Cybersecurity and Digital Forensics
                </h2>
                <p style={{ textAlign: 'right', fontSize: 'small' }}>
                    <i>
                        <b>Business Professionals of America</b><br />
                        2024<br />
                    </i>
                </p>
                <h2>
                <br />
                National Finalist in Economic Research Team
                </h2>
                <p style={{ textAlign: 'right', fontSize: 'small' }}>
                    <i>
                        <b>Business Professionals of America</b><br />
                        2024<br />
                    </i>
                </p>
                <h2>
                <br />
                State Finalist in Python Programming
                </h2>
                <p style={{ textAlign: 'right', fontSize: 'small' }}>
                    <i>
                        <b>Business Professionals of America</b><br />
                        2024<br />
                    </i>
                </p>
                <h2>
                <br />
                State Finalist in Pharmacy Science
                </h2>
                <p style={{ textAlign: 'right', fontSize: 'small' }}>
                    <i>
                    <b>HOSA - Future Health Professionals</b><br />
                    2024<br />
                    </i>
                </p>
                <h2>
                <br />
                State Finalist in Pharmacy Science
                </h2>
                <p style={{ textAlign: 'right', fontSize: 'small' }}>
                    <i>
                    <b>HOSA - Future Health Professionals</b><br />
                    2023<br />
                    </i>
                </p>
                <h2>
                <br />
                State Finalist in Health Career Display
                </h2>
                <p style={{ textAlign: 'right', fontSize: 'small' }}>
                    <i>
                        <b>HOSA - Future Health Professionals</b><br />
                        2024<br />
                    </i>
                </p>
            </>
        )
    },
    {
        name: '',
        headerIcon: <InfoIcon />,  
        extraClass: '',
        notInMenu: false,
        content: <BotpressChat />
    }
];

export { CommonConfig, ProjectsConfig, CustomSectionsConfig, Icons };

function generateNewSignaturePathD() {
    return `M60.59,370.39l-7.55-16.77,2.78-12.81,6.45-10.58,4.35-6.33,5.6-8.39,27.67-18.17,72.09-57.42,11.24-22.73-3,1.8-10.99-4.4-5.38-5.79-.48,3.31-4.42,11.93-6.28,12.08-7.96,5.31-10.62,5.31-9.14-11.42-2.27,4.7-13.79,32.44-13.19,18.46-25.31,17.45-24.71,6.06-14.56-5.52-9.02-6.17-10.04-11-5.66-17.4-4.37-12.67v-15.22l-2.03-20.75,2.94-24.67,4.07-24,9.31-29.56,5.77-17.72,11.32-22.65,9-11.7,6.67-5.06,9.74-5.85h11.43l11.64,2.48,11.78,8.34,7.48,9.98,4.9,16.56,5.16,23.79,2.98,11.92v2.56l1.36-8.42.46-8.18,5.13-11.28,10.89-10.89,13.46,2.38,8.93,11.48-.03,14.81-1.68,18.04-12.97,36.68-6.33,13.1,2.97,7.73,1.76,2.21,3.01-2.01,4.07-7.83,3.54-9.57,5.02-34.43,2.36-38.79v-9.33l14.99-.38,1.6,31.83v27.96l2.65,13.91,2.56,2.76.95.38,3.14-1.88,4.12-6.97,3.16-5.96,3.34-11.14,2.5-9.29v-24.02l-3.56-47.69,14.73-2.48,3.83,14.48v35.12l.68,9.06,3.89-13.8,1.58-27.4,2.74-26.29v-12.75l8.5-.29,1.51-5.54,6.71-8.57,5.88-3.74,7.26-3.39,17.03-3.28,4.99,10.83,5.51,13.56,2.21,14.58v11.41l1.45,17.6,8.24-60.01v-24.97l5.43-25.17,12.07-4.31,12.84,4.73.85,1.64.26-1.2v-3.17h15v56.3l2.39,13.94v6.75l1.62,3.09,3.13.89.7-2.23,10.19-19.53,9-11.34,2.67-6.03,3.19-5.85,8.21-12.03h12.04l9.78,7.33v7.48l2.65,9.28-2.96,11.8-4.23,14.4-7.13,12.36-170.29,135.64v24.36l242.48-169.99,25.56-10.78.89-.6,1.29-1.55,11.52,9.6-2.69,3.22-3.88,2.59-25.4,10.72-251.38,176.23-.03,12.55-1.23,13.57-3.99,19.04-10.11,14.5-9.71,13.41-12.16,4.42h-14.04l-10.41-5.86-5.99-15.25.76-9.49-16.57,11.61-37.51,29.04-21.89,10.5-10.66,4.26ZM69.95,346.46l-.89,4.1,16.14-7.76,36.69-28.4,31.21-21.88,2.6-10.55,4.4-13.42-51.41,40.95-25.69,16.87-3.99,5.99-4.26,6.2-4.81,7.9ZM166.78,330.56h7.46l5.36-1.95,6.97-9.63,8.24-11.83,3.18-15.2,1.12-12.37v-1.02l-32.8,22.99-.74,2.96-3.32,10.32-.59,7.36,2.77,7.05,2.33,1.31ZM38.11,295.53l8.53,3.24,17.5-4.29,20.88-14.4,10.7-14.98,7.66-18.03-12.78,3.33-9.55-3.98-6.36-11.66-4.35-13.05-2.22-11.54v-7.76l-.43-1.73-1.57,3.13-4.21,10-5.66,10.46-3.79.76v12.41l-3.86,15.44-9.16,32.65-14.44-4.05,9.13-32.55,3.33-13.34v-7.57h0s-10.77-13.05-10.77-13.05l-1.97-13.76v-23.27l1.36-11.6-4.47,14.2-3.86,22.8-2.67,22.5,1.95,20.23v13.08l3.61,10.49,4.68,14.38,6.68,7.32,6.11,4.18ZM178.55,260.47l-6.06,18.45,27.46-19.25.77-5.36v-18.11l-16.77,13.36-5.4,10.91ZM91.7,234.6h0s2.63-.68,2.63-.68l1.09-3.65,1.89-8.69,1.86-11.15v-51.01l-2.62-10.5-2.39-11.15-2.72-12.44-3.92-13.18-4.46-5.95-7.33-5.2-7.07-1.5h-5.69l-5.81,3.49-4.06,3.12-6.93,9-10.18,20.35-4.53,13.9,3.42-9.4,13.3,9.31,7.86,13.11v28.04l.59-1.18,3.57-13.01,5.67-15.63.28-8,.82-5.31,1.17-16.81,14.98.52v25.67l-2.33,6.81-.45,12.94.37,14.48,2.41,9.65v8.17l1.76,9.16,3.61,10.84,3.19,5.86ZM114.19,208.11v3.55l-2.16,12.92-1.19,5.47,6.22-12.88-2.57-6.67-.31-2.39ZM200.72,216.75l-.29.51.29-.23v-.28ZM214.2,193.02l1.11,12.38,23.22-18.5-12.98-19.11-.73-10.69-9.65,34.19-.99,1.73ZM39.73,200.16l.14.98,1.19-11.19v-22.37l-1.32,11.26v21.33ZM128.12,186.52v6.14l9.8-27.83,1.47-15.85v-8.63l-2.22-2.86h-.08s-3.44,3.43-3.44,3.43l-2.84,6.24-.4,6.54-1.9,11.75v12.07s-.4,9-.4,9ZM237.74,85.56l6.51,96.79,34.16-27.21-9.47-10.26-2.5-13.25-2.81-34.46v-10.58l-1.77-11.7-4.65-11.44-3.66.7-4.69,2.19-2.88,1.83-3.27,4.17-1.97,7.22-3,6ZM292.17,136.7v7.48l56.9-45.32-8.39-.65-12.17-3.48-.98-1.86-2.12,11.32-5.07,15.71-14.97,7.88-10.61-9.85-2.58,18.78ZM305.7,94.95l1.92,11.57.37,2.75,2.83-8.78,3.37-17.96v-37.83l-2.79-11.55v-.45l-.71-1.53-.09.09-2.83,12.31-.95,3.16-1.52,24.26.39,11.83v12.12ZM356.52,86.52l-2.71,8.56,20.62-16.43,4.81-8.35,3.69-12.53,1.86-7.46-2.13-7.44v-.28l-2.41,3.53-2.46,4.56-3.05,6.98-9.32,11.75-8.92,17.1Z"/>`;
}
