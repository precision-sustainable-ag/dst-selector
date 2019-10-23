import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

class CropSuggestions extends Component {
    // const classes = useStyles();

    constructor(props) {
        super(props);

    }

    createCards = () => {
        const classes = this.props;
        let parent = [];
        this.props.cropData.map((crop, index) => {
            parent.push(

                <Grid item lg={3} md={4} key={index}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                src="https://placehold.it/500x500"
                                title=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{crop.coverCropName}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p"></Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">Select</Button>
                        </CardActions>
                    </Card>
                </Grid>

            );
        });
        return parent;
    }

    render() {

        return (
            <Grid container spacing={10}>
                {this.createCards()}
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CropSuggestions);