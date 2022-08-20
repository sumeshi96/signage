from bs4 import BeautifulSoup
import requests
import json


def main(URL):
    dict = {}

    url = requests.get(URL)
    soup = BeautifulSoup(url.text, "lxml")
    
    soup_today = soup.select('.today-weather')[0]
    soup_tomorrow = soup.select('.tomorrow-weather')[0]
    dict["today"] = output(soup_today)
    dict["tomorrow"] = output(soup_tomorrow)
    
    #json出力
    with open('src/forecast.json','w') as f:
        json.dump(dict,f,ensure_ascii=False,indent=4)


def output(soup):
    forecast = {}

    # 天気
    weather_telop = soup.find("p", class_="weather-telop").get_text()
    # 最高気温
    high_temp = soup.find("dd", class_="high-temp").get_text()
    #high_temp_set="{:02}".format(high_temp)
    # 最低気温
    low_temp = soup.find("dd", class_="low-temp").get_text()
    
    # 降水確率
    rain_probability = soup.select('.rain-probability > td')
    every_six = {}
    for i in range(4):
        time_from = 0+6*i
        time_to = 6+6*i
        time = "{:02}-{:02}".format(time_from, time_to)
        every_six[time] = rain_probability[i].text.strip()

    forecast["weather"] = weather_telop
    forecast["high_temp"] = high_temp
    forecast["low_temp"] = low_temp    
    forecast["every_six_00-06"] = every_six['00-06']
    forecast["every_six_06-12"] = every_six['06-12']
    forecast["every_six_12-18"] = every_six['12-18']
    forecast["every_six_18-24"] = every_six['18-24']

    return forecast

if __name__ == '__main__':
    URL = "https://tenki.jp/forecast/1/4/2300/1202/"
    main(URL)
