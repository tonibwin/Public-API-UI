import React, { useState, useEffect } from 'react';
import PublicApiManager from "../manager/public-api-manager";
import InformationCard from "./information-card";
import InformationCardInterface from "../interfaces/information-card-interface";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import {Button, IconButton} from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function PublicApiDisplay() {
    const [publicApiCards, setPublicApiCards] = useState([] as InformationCardInterface[])
    const [categories, setCategories] = useState([] as string[])
    const [categoriesSet, setCategoriesSet] = useState([] as string[])
    const [categoriesOffset, setCategoriesOffset] = useState(10)

    useEffect(() => {
        PublicApiManager.getEntries()
            .then(e => {
                setPublicApiCards(PublicApiManager.transformEntries(e));
            }).catch(err => {
                throw new Error(err);
            });

        PublicApiManager.getCategories()
            .then(c => {
                setCategories(c);
                setCategoriesSet(c.slice(0, categoriesOffset));
            }).catch(err => {
                throw new Error(err);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4">
                Public APIs
            </Typography>
            <Typography variant="subtitle2">
                <Link href="https://github.com/davemachado/public-api">Provided by Public APIs</Link>
            </Typography>
            <Typography variant="subtitle1">
                A collective list of free APIs for use in software and web development
            </Typography>

            {categoriesSet &&
                <Grid container spacing={1} p={3}>
                    <Grid item md={1}>
                        <IconButton aria-label="navigateBefore">
                            <NavigateBeforeIcon />
                        </IconButton>
                    </Grid>
                    {categoriesSet.map(category => (
                        <Grid item md={1}>
                            <Button variant="text">{category}</Button>
                        </Grid>
                    ))}
                    <Grid item md={1}>
                        <IconButton aria-label="navigateNext">
                            <NavigateNextIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            }

            <Grid container spacing={3} p={3}>
                {publicApiCards && publicApiCards.map(card => (
                    <Grid item md={4}>
                        <InformationCard info={card.info} link={card.link}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export default PublicApiDisplay;