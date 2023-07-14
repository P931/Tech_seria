import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import Grid from '@mui/system/Unstable_Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import axios from 'axios'

const useStyles = makeStyles({
  userMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userApiData: {
    display: "flex",
    position: "relative",
    top: "140px",
    right: "290px",
    "&>div:nth-child(2)": {
      padding: "1px 31px",
    }
  },

})
const Home = () => {

  const classes = useStyles()

  const [searchCityName, setsearchCityName] = useState('')
  const [apiData, setApiData] = useState()
  const [recentSearchCity, setRecentSearchCity] = useState([])

  console.log("recencity is :- ", recentSearchCity)

  const handlerSearchUserCityName = (e) => {
    setsearchCityName(e.target.value)
  }

  const fetchUserCity = async () => {

    try {

      if (recentSearchCity[searchCityName] !== storagedata.name) {

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&appid=72f425e183edb83c4c6834839e1014b7`)
        console.log("response is :- ", response)
        setApiData(response.data)
        localStorage.setItem("Apidata", JSON.stringify(response.data))

        setRecentSearchCity([
          ...recentSearchCity,
          searchCityName
        ])

      } else {
        console.log(`it is already search ${searchCityName}`)
      }

    } catch (error) {
      console.log("Error is :- ", error)
    }

  }

  useEffect(() => {
    fetchUserCity()
  }, [])

  const storagedata = JSON.parse(localStorage.getItem('Apidata'))
  console.log("storage in local is :- ", storagedata)

  return (
    <Grid className={classes.userMainContainer}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchCityName}
        onChange={(e) => handlerSearchUserCityName(e)}
      />
      <Button
        onClick={() => fetchUserCity()}
      >
        Search
      </Button>
      <Grid className={classes.userApiData}>
        <Grid>
          <Typography>CountryName</Typography>
          <Typography>City</Typography>
          <Typography>Temp</Typography>
          <Typography>min.Temp</Typography>
          <Typography>max.Temp</Typography>
          <Typography>Wind speed</Typography>
          <Typography>Humidity</Typography>
        </Grid>
        <Grid>
          <Typography>{storagedata.sys.country}</Typography>
          <Typography>{storagedata.name}</Typography>
          <Typography>{storagedata.main.temp}</Typography>
          <Typography>{storagedata.main.temp_min}</Typography>
          <Typography>{storagedata.main.temp_max}</Typography>
          <Typography>{storagedata.wind.speed}</Typography>
          <Typography>{storagedata.main.humidity}</Typography>
        </Grid>
      </Grid>
      <Grid>
        <Typography>Recent SearchCityName</Typography>
        <Typography>
          {recentSearchCity.map((val) => {
            return (
              <>
                {val}
              </>
            )
          })}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Home