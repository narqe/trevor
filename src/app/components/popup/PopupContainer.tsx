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
} from '@mui/material';
import Link from 'next/link';
import { Country } from '@/models/Country';
import { DataList } from '@/models/DataList';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import TranslateIcon from '@mui/icons-material/Translate';

interface Props {
    data?: Country
}

const PopupContainer = ({ data: { emoji, name, code, capital, currency, phone, awsRegion, languages }}: Props) => {
    const dataList: DataList[] = [{
        label: 'Capital City',
        value: capital,
        icon: <LanguageIcon size="small" />
    },{
        label: 'Currency',
        value: currency,
        icon: <CurrencyExchangeIcon size="small" />
    },{
        label: 'Phone',
        value: `+(${phone})`,
        icon: <PhoneIcon size="small" />
    },{
        label: 'AWS Region',
        value: awsRegion,
        icon: <SouthAmericaIcon size="small" />
    }]

    return (
        <Popup keepInView={true}>
            <Card sx={{ width: 300 }} elevation={0}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {emoji} {name} - ({code})
                    </Typography>
                    <Divider />
                    <List sx={{ width: '100%'}} dense>
                        <DataList data={dataList} /> 
                        <ListItem sx={{ p: 0 }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <TranslateIcon size="small" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Oficial languages' />
                        </ListItem>
                        <Stack direction="row" spacing={1} sx={{ my: 1, pl: 6, overflowX: 'scroll' }}>
                            {languages.map(({ name }: string[]) => (
                                <Chip 
                                    key={name} 
                                    label={name} 
                                    size={'small'} 
                                    variant="outlined" 
                                />
                            ))}
                        </Stack>
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

const DataList = ({ data }: DataList[]) => {
    return data.map(({ label, value, icon }) => {
        return (
            <ListItem key={value} sx={{ p: 0 }}>
                <ListItemAvatar>
                    <Avatar>
                        {icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText sx={{ p: 0 }} primary={label} secondary={value} />
            </ListItem>
        )
    })
}

export default PopupContainer