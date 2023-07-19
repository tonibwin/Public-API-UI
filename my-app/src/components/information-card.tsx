import React from 'react';
import InformationCardInterface from "../interfaces/information-card-interface";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function InformationCard({info, link}: InformationCardInterface) {
    return (
        <Link href={link} underline="none">
            <Card sx={{height:'100%'}}>
                {info && info.map(i => (
                    <CardContent>
                        {i.showKey ?
                            <Typography variant={i.variant} component="div">
                                {i.key}
                            </Typography> :
                            i.showValue ?
                                <Typography variant={i.variant}>
                                    {i.value}
                                </Typography> : ""
                        }
                    </CardContent>
                ))}
            </Card>
        </Link>
    );
}
export default InformationCard;