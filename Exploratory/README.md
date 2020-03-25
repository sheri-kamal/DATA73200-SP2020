# [Project 1: Exporatory Visualization](https://sheri-kamal.github.io/DATA73200-SP2020/Exploratory/)

## [Prospectus](https://github.com/sheri-kamal/DATA73200-SP2020/tree/master/Exploratory)
Due to the pandemic caused by the novel Coronavirus (COVID-19), you may have noticed that the stock markets have been turbulent as a result of fears that the pandemic will have on different industries and trade. These fears have caused financial markets to tumble at an alarming rate and at times triggering the "circuit breakers" to halt trading. The triggering of these "circuit breakers" seems to occur more frequently with the duration of the pandemic. It is safe to say if the pandemic is prolonged then the negative impacts on the financial markets and the economy as a whole could push us into a recession, which we have not been in for 11 years. 

It is precisely these thoughts which drove me to explore financial market data. More specifically, I will be exploring several major indexes that are traded on the New York Stock Exchange (NYSE) and to explore the VIX also known as the "fear index". In finance, a central idea is "the best indicator of future performance is past performance", which is why many forecasting models are heavily dependent on historical data. By exploring these indexes we may be able to get a sense of where the market is heading, which will be useful for the Federal Reserve and policy makers to know because if the market is heading towards a recession they may be able to provide a boost to the economy and in turn the financial markets. This exploration is also useful for traders because if it looks like we may be heading towards a recession then they may want to shift their money from equities into another financial instrument.

Since there is no convenient dataset that includes these indexes, I will be aggregating the data from Yahoo Finance and performing any necessary data transformations in Excel.

## [Sketches and Mockups](https://github.com/sheri-kamal/DATA73200-SP2020/blob/master/Exploratory/Sketches%20and%20Mockups.pdf)
With this data, specifically financial data, there are several types of visualizations that come to mind, but the one that stands out immediately is a simple time series line or area chart of the market index. Another type of visualization that comes to mind, disregarding the temporality of the data, is a scatter plot of the VIX index against a market index to explore a relationship between the two indexes. A final type of visualization that I would consider is a bar chart that looks at the percent change from one day/month/year to the next of a particular index.

## [Architectural Schema](https://github.com/sheri-kamal/DATA73200-SP2020/blob/master/Exploratory/index.html)
With any of the visualizations, there will be a definite need for a drop-down or some other selection UI element so that the user can select a financial index to view. I would also want to include another UI element so that the user can determine if they want to only see data from a recession or a non-recession period. The layout of the visualization will be a dashboard made up of two side by side charts.

## [Final Data](https://github.com/sheri-kamal/DATA73200-SP2020/blob/master/Exploratory/Final%20Dataset.csv)
Contains the following 14 variables (6 of which are generated transformed variables):
  * Date
  * Dow Jones Industrial Average
    * DJIA % Change
  * S&P 500
    * S&P % Change
  * NASDAQ Composite
    * NASDAQ % Change
  * NYSE COMPOSITE
    * NYSE % Change
  * Russell 2000
    * Russell % Change
  * CBOE Volatility Index
    * VIX % Change
  * Recession

## [Final Project](https://sheri-kamal.github.io/DATA73200-SP2020/Exploratory/)

