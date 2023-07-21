import React, { useState, useEffect } from 'react';
import PublicApiManager from "../manager/public-api-manager";
import InformationCard from "./information-card";
import InformationCardInterface from "../interfaces/information-card-interface";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import CategoriesPagination from "./categories-pagination";
import Entry from "../dtos/entry";
import Button from '@material-ui/core/Button';
import './public-api-display.css';

function PublicApiDisplay() {
    const [publicApis, setPublicApis] = useState([] as Entry[])
    const [publicApiCards, setPublicApiCards] = useState([] as InformationCardInterface[])
    const [selectedCategory, setSelectedCategory] = useState<string>("")

    useEffect(() => {
        PublicApiManager.getEntries()
            .then(e => {
                setPublicApis(e);
                setPublicApiCards(PublicApiManager.transformEntries(e));
            }).catch(err => {
                throw new Error(err);
            });
    }, []);

    useEffect(() => {
        if (selectedCategory != "") {
            const filteredApis = publicApis.filter(api => api.Category == selectedCategory);
            setPublicApiCards(PublicApiManager.transformEntries(filteredApis));
        } else {
            setPublicApiCards(PublicApiManager.transformEntries(publicApis));
        }
    }, [selectedCategory]);

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

            <div className="pau-padding-top-l pau-padding-bottom-l">
                <CategoriesPagination selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            </div>

            <Grid container spacing={3} p={3}>
                <Grid item md={12}>
                    <Button variant="contained" color="secondary" onClick={() => setSelectedCategory("")}>SHOW ALL</Button>
                </Grid>
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