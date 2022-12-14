import * as React from 'react';
import "./Options.scss";
import DatePicker from "../../components/Datepicker/Datepicker";
import StrikePrices from "../strikeprice/StrikePrice";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Tabs ,{ tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import Chart from "../../components/chart/Chart";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Icon from "react-crypto-icons";
import Web3 from 'web3'
import hegicMainnet from '../../abi/hegicMainnet.json'
import {addressHegicDemo, addressHegicMainnet, addressUSDCMainnet} from '../../abi/addressPool'
import abiUSDC from '../../abi/abiFile/abiUSDCERC20.json'
import abiHegicWETHPUT  from '../../abi/abiFile/abiHegicWETHPUT.json' 
import abiHegicWETHCALL from '../../abi/abiFile/abiHegicWETHCALL.json'
import abiFacade  from '../../abi/abiFile/abiFacade.json' 
import fromExponential from 'from-exponential'
import {USDC,Facade,HegicWETHPUT,HegicWETHCALL,WETH} from '../../abi/addressTestnet'
import {BigNumber as BN, ethers, Signer} from "ethers"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function RecipeReviewCard({connected, address, connectWallet, disconnectWallet}) {
    const [value, setValue] = React.useState(0);
    React.useEffect(()=>{
        
    })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [age, setAge] = React.useState('');

  const handleChangec = (event) => {
    setAge(event.target.value);
  };
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChangeshow = (event) => {
    setAuth(event.target.checked);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const callHegic = async () => {
    if (address && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        let userwalletaddresss = accounts[0];
        console.log("ACCOUTNS", userwalletaddresss);
        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(abiUSDC,USDC)
            console.log("@@@@@@@",swaping);
        let d  = await swaping.methods.approve(Facade, ethers.constants.MaxUint256).send({ from: userwalletaddresss })
        // let d = await swaping.methods.mintTo(Facade, ethers.constants.MaxUint256).send({ from: userwalletaddresss })
            console.log("@@@",d);
        // let z  = await swaping.methods.approve(HegicWETHPUT, ethers.constants.MaxUint256).send({ from: userwalletaddresss })
        // console.log("@@@",z);
       // let m = await swaping.methods.approve(Facade, 1000).send({ from: userwalletaddresss })  
    }
}
  const callFacade = async()=>{
//    alert("Under process");

    if (address && window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      let userwalletaddresss = accounts[0];
      console.log("ACCOUTNS", userwalletaddresss);
      window.web3 = new Web3(window.ethereum);
      let facadTnx = new window.web3.eth.Contract(abiFacade,Facade)
          console.log("@@@@@@@",facadTnx);

      // let amountInexp = window.web3.utils.toBN(fromExponential(((parseFloat(1336.65)) * Math.pow(6, 18))));
      //   console.log("amountInexp",amountInexp);
      const amount = Web3.utils.toWei('0.03', 'ether');
      let time  = 24*3600 // 1 day    
      //const strikePrice = Web3.utils.fromWei('1336.65');
       //const strike = Web3.utils.fromWei('1331')
     //  const acceptablePrice = Web3.utils.toWei('1635','ether')
      // console.log('====================================');
      // console.log("strikePrice",strikePrice,acceptablePrice); 
      // console.log('====================================');
     let d  = await facadTnx.methods.createOption(HegicWETHCALL,time,amount,132111731807,[USDC,WETH],2816319 ).send({ from: userwalletaddresss })
      // let d = await swaping.methods.mintTo(Facade, ethers.constants.MaxUint256).send({ from: userwalletaddresss })
         console.log("@@@",d);
      // let z  = await swaping.methods.approve(HegicWETHPUT, ethers.constants.MaxUint256).send({ from: userwalletaddresss })
      // console.log("@@@",z);
     // let m = await swaping.methods.approve(Facade, 1000).send({ from: userwalletaddresss })  
  }
  }
  return (
    
    <Box container  className='option_main' sx={{ flexGrow: 1 , width: '88%', margin: '0 auto', padding: '0px 30px' }}>
      <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              spacing={2}>
             
       <Typography variant="h4" gutterBottom>
       <b>Options</b>
      </Typography>
      <FormGroup>
        <FormControlLabel
        label='Show potential P&L'
          control={
            <Switch
              checked={auth}
              onChange={handleChangeshow}
              aria-label="login switch"
            />
          }
          
        />
      </FormGroup>
      
            </Stack>
      <Grid container spacing={{ xs: 2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* First Grid start*/}
        <Grid item xs={2} sm={4} md={4}>
          <Card  className="option_wpapper">
          <FormControl fullWidth >
            <Select
              value={age}
              className="select_box"
              onChange={handleChangec}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" >
              <Icon name="BNB" size={25} sx={{ mr: 2}} position="start"/>  <span paragraph>WETH</span>
              </MenuItem>
              <MenuItem disabled value={30}>No match found </MenuItem>
            </Select>
          </FormControl>
          </Card>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>No match found</Typography>
            </CardContent>
          </Collapse>
         
          <Card sx={{ padding: '24px 24px 8px'}}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }} className='tabers_call'>
          <ToggleButtonGroup
              value={alignment}
              exclusive
              fullWidth
              onChange={handleAlignment}>
              <ToggleButton value="left" aria-label="left aligned">
              <span ><ArrowUpwardIcon/> Call</span>
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
              <span > <ArrowDownwardIcon/> Put</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <StrikePrices/>
          <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              spacing={2}
            >
              <span >Expiration date</span>
              <span >Expires in 6d 2h 38min</span>
              </Stack>
             
            <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: '#f1f1f1' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                }}
              >
                <Tab label="Aug 23" />
                <Tab label="Aug 23" />
                <Tab label="Aug 23" />
                <Tab label="Aug 23" />
                <Tab label="Aug 23" />
                <Tab label="Aug 23" />
                <Tab label="Aug 23" />
              </Tabs>
            </Box>
          <DatePicker />
          <FormControl fullWidth  sx={{ pb: 2}}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              spacing={2}>
              <span >Option Size</span>
              <span >No match found</span>
            </Stack>
              <OutlinedInput 
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
          </Card>

        </Grid>
         {/* First Grid end*/}
        {/* Second Grid Start*/}
        <Grid item xs={2} sm={3} md={3}>
        <Box sx={{ width: '100%', maxWidth: 500 ,mb: 10 }}>
          <Typography variant="p" gutterBottom>
          Current price
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 500}}>
          <Typography className='disable_class' variant="span" gutterBottom>
          Network coming soon <QuestionMarkIcon/>
          </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 500 ,mb: 10 }}>
          <Typography sx={{ width: '100%', display: 'flex', alignItems: 'center' }} variant="p" gutterBottom>
          Breakeven  <QuestionMarkIcon/>
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 500}}>
          <Typography   className='disable_class'  variant="span" gutterBottom>
          Network coming soon <QuestionMarkIcon/>
          </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 500 ,mb: 10 }}>
          <Typography  sx={{ width: '100%', display: 'flex', alignItems: 'center' }} variant="p" gutterBottom>
          Total cost  <QuestionMarkIcon/>
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 500}}>
          <Typography  className='disable_class'  variant="span" gutterBottom>
          Network coming soon <QuestionMarkIcon/>
          </Typography>
          </Box>
        </Box>
        {/* <Button fullWidth variant="contained" className="connect_btn " startIcon={<AccountBalanceWalletIcon />}>
            Connect Wallet
          </Button> */}
              {!address ? (
        <Button
          variant="contained"
          className="connect_btn "
          startIcon={<AccountBalanceWalletIcon />}
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      ) : (
           <div>
              <div>
              <Button variant="contained" className="connect_btn " onClick={callHegic}>
                Approve
              </Button>
              </div>
              <div>
              <Button variant="contained" className="connect_btn " onClick={callFacade}>
                Buy
              </Button>
              </div>
         </div>
      )}

          <Stack
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={2}>
              <Typography variant="span" gutterBottom>
          Pool size:  
          </Typography>
          <Skeleton variant="text" sx={{ fontSize: '5px' , width: '50px' }} />
            </Stack>
         
        </Grid>
        {/* Second Grid end*/}
        {/* third Grid Start */}
        <Grid item xs={2} sm={3} md={3}>
        <div className="charts">
        {auth && (
           <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          )}
        </div>
        </Grid>
        {/* third Grid end*/}
      </Grid>
      <Box
      sx={{
        width: "100%",
        height: 300,
      }}
    >
      </Box>
    </Box>
  
  );
}