import { Popup } from 'react-leaflet';
import {
    Divider,
    Stack,
    Chip,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Box
} from '@mui/material';
import Link from 'next/link';
import { Country } from '@/models/Country';
import type { DataList } from '@/models/DataList';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import TranslateIcon from '@mui/icons-material/Translate';

interface Props {
    data: Country
}

const PopupContainer = ({ 
    data: { emoji, name, code, capital, currency, phone, awsRegion, languages }
} : Props) => {
    const data: DataList[] = [{
        label: 'Capital City',
        value: capital,
        icon: <LanguageIcon />
    },{
        label: 'Currency',
        value: currency,
        icon: <CurrencyExchangeIcon />
    },{
        label: 'Phone',
        value: `+(${phone})`,
        icon: <PhoneIcon />
    },{
        label: 'AWS Region',
        value: awsRegion,
        icon: <SouthAmericaIcon />
    }];

    return (
        <Popup keepInView={true}>
            <Card sx={{ width: 300 }} elevation={0}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {emoji} {name} - ({code})
                    </Typography>
                    <Divider />
                    <List sx={{ width: '100%'}} dense>
                        {DataComponent(data)} 
                        <ListItem sx={{ p: 0 }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <TranslateIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Box sx={{ display: 'grid', my: 1 }}>
                                <Typography variant="caption" sx={{ color: 'gray', pb: 0.5 }}>Official Languages</Typography>
                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ overflowX: 'scroll' }}>
                                    {languages.map(lang => (
                                        <Chip 
                                            key={lang.name} 
                                            label={lang.name} 
                                            size={'small'} 
                                            color="primary"
                                            variant="outlined" 
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </ListItem>
                    </List>
                </CardContent>
                <Divider />
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href={`https://es.wikipedia.org/wiki/${name}`} target="_blank">
                        <Button>More</Button>
                    </Link>
                </CardActions>
            </Card>
        </Popup>
    )
}

const DataComponent = (data: DataList[]) => {
    return data.map(({ label, value, icon }) => {
        return (
            <ListItem key={value} sx={{ p: 0 }} dense>
                <ListItemAvatar>
                    <Avatar>
                        {icon}
                    </Avatar>
                </ListItemAvatar>
                <Box sx={{ display: 'grid', my: 1 }}>
                    <Typography variant="caption" sx={{ color: 'gray' }}>{label}</Typography>
                    <Typography variant="body1" sx={{ m: '0 !important' }}>{value}</Typography>
                </Box>
            </ListItem>
        )
    })
}

export default PopupContainer