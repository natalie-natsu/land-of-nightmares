import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionDivider: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

function Credits() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className="Credits">
      <Container maxWidth="sm">

        <section className={classes.section}>
          <Typography variant="h4" component="h3" color="textPrimary" align="center" gutterBottom>
            {t('Credits.authors')}
          </Typography>
          <Divider className={classes.sectionDivider} />
          <List className={classes.root}>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  alt={t('Credits.avatarAlt', { name: 'Nicolas' })}
                  src=""
                />
              </ListItemAvatar>
              <ListItemText primary="Nicolas Rouvière" />
            </ListItem>
          </List>
        </section>

        <section className={classes.section}>
          <Typography variant="h4" component="h3" color="textPrimary" align="center" gutterBottom>
            {t('Credits.development')}
          </Typography>
          <Divider className={classes.sectionDivider} />
          <List className={classes.root}>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  alt={t('Credits.avatarAlt', { name: 'Nicolas' })}
                  src=""
                />
              </ListItemAvatar>
              <ListItemText primary="Nicolas Rouvière" />
            </ListItem>
          </List>
        </section>

        <section className={classes.section}>
          <Typography variant="h4" component="h3" color="textPrimary" align="center" gutterBottom>
            {t('Credits.scenario')}
          </Typography>
          <Divider className={classes.sectionDivider} />
          <List className={classes.root}>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  alt={t('Credits.avatarAlt', { name: 'Nicolas' })}
                  src=""
                />
              </ListItemAvatar>
              <ListItemText primary="Nicolas Rouvière" />
            </ListItem>
          </List>
        </section>

        <section className={classes.section}>
          <Typography variant="h4" component="h3" color="textPrimary" align="center" gutterBottom>
            {t('Credits.graphics')}
          </Typography>
          <Divider className={classes.sectionDivider} />
          <List className={classes.root}>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  alt={t('Credits.avatarAlt', { name: 'Nobody' })}
                  src=""
                />
              </ListItemAvatar>
              <ListItemText primary="Nobody" />
            </ListItem>
          </List>
        </section>

        <section className={classes.section}>
          <Typography variant="h4" component="h3" color="textPrimary" align="center" gutterBottom>
            {t('Credits.audio')}
          </Typography>
          <Divider className={classes.sectionDivider} />
          <List className={classes.root}>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              href="https://www.newgrounds.com/audio/listen/737321"
            >
              <ListItemAvatar>
                <Avatar
                  alt={t('Credits.avatarAlt', { name: 'Nukkie' })}
                  src="https://uimg.ngfiles.com/icons/6189/6189823_large.jpg?f1502550588"
                />
              </ListItemAvatar>
              <ListItemText primary="Nukkie - United" />
            </ListItem>
          </List>
        </section>

        <section className={classes.section}>
          <Typography variant="h4" component="h3" color="textPrimary" align="center" gutterBottom>
            {t('Credits.voices')}
          </Typography>
          <Divider className={classes.sectionDivider} />
          <List className={classes.root}>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  alt={t('Credits.avatarAlt', { name: 'Nobody' })}
                  src=""
                />
              </ListItemAvatar>
              <ListItemText primary="Nobody" />
            </ListItem>
          </List>
        </section>

        <section className={classes.section}>
          <Typography variant="h4" component="h3" color="textPrimary" align="center" gutterBottom>
            {t('Credits.testers')}
          </Typography>
          <Divider className={classes.sectionDivider} />
          <List className={classes.root}>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar
                  alt={t('Credits.avatarAlt', { name: 'Nobody' })}
                  src=""
                />
              </ListItemAvatar>
              <ListItemText primary="Nobody" />
            </ListItem>
          </List>
        </section>

      </Container>
    </div>
  );
}

export default Credits;
