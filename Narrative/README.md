# [Project 2: Narrative Visualization](https://sheri-kamal.github.io/DATA73200-SP2020/Narrative/)

## [Prospectus](https://github.com/sheri-kamal/DATA73200-SP2020/tree/master/Narrative)
This is a more in depth exploration of the 311 Water Quality Complaint data from 2010 to 2019 that I explored in the first project. While working with the water quality complaint data in the first project, it became clear that some boroughs had many more water quality complaints than other boroughs and I decided to take an in depth look into these complaints as well as determine if water quality complaints had any affect on waterborne illness cases during the same time period. 

This in depth exploration could prove useful to help city and government agencies, the Department of Health and Mental Hygiene and the Department of Environmental Protection specifically, to determine which areas are in need of water quality improvement and to determine if there any factors which could contribute to the causes of waterborne illness in the boroughs or areas where the cases of waterborne illnesses are high or clustered and take measures to prevent outbreaks.

## [Sketches and Mockups](https://github.com/sheri-kamal/DATA73200-SP2020/blob/master/Narrative/Sketches%20and%20Mockups.png)
For my visualization, I believe that a scatter plot would be most useful to show a relationship between water quality complaints and cases of waterborne illness. I also believe that a pair of side-by-side bar charts with one depicting the amount of water quality complaints by borough and the other depicting the amount of waterborne illnesses by borough would be useful by providing perspective on cases of waterborne illnesses in relation to water quality complaints.

## [Architectural Schema](https://github.com/sheri-kamal/DATA73200-SP2020/blob/master/Narrative/Architectural%20Schema.png)
The layout of the visualization will be a webpage with two bar charts and a scatter plot as well as text throughout the page. Each visualization is created using seperate JS files with export functions and are imported into the main JS file which is used in the HTML file.

## [Final Data](https://github.com/sheri-kamal/DATA73200-SP2020/blob/master/Narrative/Final%20Dataset.csv)
This dataset contains the following  variables:
  * Year (missing from simplified file)
  * Borough
  * Waterborne Illness (summed for each borough in simplified file)
  * Water Quality (summed for each borough in simplified file)

## [Final Project](https://sheri-kamal.github.io/DATA73200-SP2020/Narrative/)
