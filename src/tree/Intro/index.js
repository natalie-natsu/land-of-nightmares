import ButtonElement from '@react-story-rich/ui/components/Element/Button';
import Navigation from '@react-story-rich/core/classes/Navigation';

import DiceRollElement from 'components/Element/DiceRoll';

const Intro = ['Intro', [
  `Aussi grande soit-elle, chaque civilisation est vouée à disparaître
    et les ruines laissées par nos ancêtres cohabitent avec les monuments de notre ère.
    Mais dans ce vieux monde abîmé par le poids de la guerre fleuri l'audace des Hommes.
    Ils forgent le progrès, et laissent une marque parmi leurs pairs.`,

  `Cette aura qui vous entoure me parle,
  elle me montre le destin qui vous accompagne, vous et votre audace.
  Que dis-je ? Les destins ! Du plus court au plus long et du plus sombre au plus sacré...`,

  `Saurez-vous saisir les opportunités tout en préservant votre nature ?
  Parviendrez-vous à protéger les personnes qui vous sont chères ?
  Assumerez-vous les choix que vous allez prendre ?`,

  `Prenez-les sagement, naturellement, égoîstement ou peu importe,
   car rien n'est aussi simple qu'il n'en ait l'air
   et les conséquences de vos actions répondront à leur propre mystère.`,

  {
    Element: ButtonElement,
    children: 'Land of Nightmares',
    fontFamily: 'Rebucked',
    fontSize: 'xl',
    color: 'primary',
    onTap: Navigation.skip,
  },

  `Terminons les récits du passé, les Hommes et leur empire,
  les rêves des explorateurs qui jadis visitèrent ce lieu sans revenir.`,

  `Ce vieux temple que vous savez au fond d'une jungle, dense et magique est votre prison depuis une éternité.
  Vous y demeurez actuellement inerte, sommeillant au coeur de la pierre et au pied d'un monde austère.`,

  `Au coeur de votre tombeau même ! Celui de votre ancienne vie, que vous avez volontairement oublié.
   Souhaitez vous vraiment vous réveiller ?`,

  `Vous n'en avez guère le choix lorsque vous entendez le craquement du granite qui se dérobe devant vous.`,

  `Une lumière vient alors intensément vous éblouir et vous sortir définitivement de ce long repos.
  Vous la sentez aussi sur votre coprs, nu, comme si vous n'aviez jamais goûté à la vie.`,

  `L'air vous agresse, il vous fouette,
  comme s'il se vangeait, lui aussi, de ne jamais avoir pu vous toucher, durant toutes ces années !
  Ou ces millénaires, qui sait ?`,

  {
    children: `Vous n'avez aucune notion du temps, vos repères sont inexistants, tout est sombre ou néant.
    Seul votre instinct vous parle, souhaitez vous seulement lui faire confiance ?`,
    hint: `Le silence est aussi une option valable`,
    timeout: 30000,
    onTimeout: ({ goForward }) => goForward(1),
    actions: [
      { children: `Puiser dans votre instinct`, onClick: Navigation.skip },
    ],
  },

  {
    Element: DiceRollElement,
    query: '1d20>=10',
    skill: 'TIN',
    onFailure: Navigation.skip,
    onSuccess: ({ goForward }) => goForward(2),
  },

  `Vous puisez dans votre instinct pour sortir la plus féroce des mises en garde,
  mais vous n'êtes pas en posture d'effrayer quiconque vous fait-on signifier.`,

  {
    children: `« Holà féroce demoiselle ! Ca sonne bien, mais ne marche pas.
    En revanche on apprécie l’effort » vous répond une voix légèrement moqueuse.`,
    onTap: ({ goForward }) => goForward(1),
  },

  `Votre instinct vous parle. Il sent la présence de trois personnes qu'il vaudrait mieux ne pas confronter.
  Vous en êtes certaine, c'est le dialogue qu'il faudra privilégier.`,

  `Allongé sur ce lit de pierre, votre corps se rédécouvre. Il se remémore qui vous êtes,
  de la cime de vos cheveux milénaires jusqu'à la voute de vos pieds doux et fragiles.
  Vous êtes celle que l'on appelait Empathui, cela vous revient, dernière Naïade de ce temple de l'eau qui fut mis
  en sommeil par temps de guerre.`,

  `Vous vous relevez, sans un tissu pour combler votre besoin de pudeur, mais celle-ci devra attendre, car se tient
  devant vous trois aventurier dont les expressions sont, à votre étonnement, aussi perplexes que la votre.`,

  {
    character: 'worrick',
    children: `« Et bien Jakker ! C'est le trésor que tu recherchais j'espère... »
    dit l'un des trois en s'adressant à son accolyte.`,
    onTap: Navigation.skip,
  },

  `Ce dernier est le plus grand de la bande. Muni d'une petite masse et d'une armure légère, vous reconnaissez
  les caractéristiques classiques d'un prêtre.`,

  `Son interlocuteur est quant à lui le plus petit. Tellement petit qu'il ne fait aucun doute qu'il est de race naine.
  Il va de soit que sa barbe accaparre presque l'intégralité de son visage au traits durs et renfermés.
  Contrairement au premier, celui-ci est âgé et son armure, massive s'accompagne d'un beau bouclier en amande.`,

  {
    children: `Pas de suite pour l'instant. Merci les amis pour le beta test !`,
    readOnly: true,
  },
]];

export default Intro;
