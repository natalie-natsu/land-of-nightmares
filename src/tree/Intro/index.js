import ButtonElement from 'components/Element/Button';

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
    component: ButtonElement,
    children: 'Land of Nightmares',
    fontFamily: 'Rebucked',
    fontSize: 'xl',
    color: 'primary',
    onTap: ({ goForward }) => goForward(),
  },

  `Terminons les récits du passé, les Hommes et leur empire,
  les rêves des explorateurs qui jadis visitèrent ce lieu sans revenir.`,

  `Ce vieux temple que vous savez au fond d'une jungle, dense et magique est votre prison depuis une éternité.
  Vous y demeurez actuellement inerte, sommeillant au coeur de la pierre et au pied d'un monde austère.`,

  {
    children: `Au coeur de votre tombeau même ! Celui de votre ancienne vie, que vous avez volontairement oublié.
    Souhaitez vous vraiment vous réveiller ?`,
    onTimeout: ({ goForward }) => goForward(1),
    timeout: 20000,
    actions: [
      { children: `Se réveiller`, onClick: ({ goForward }) => goForward() },
      { children: `Rester passive`, onClick: ({ goForward }) => goForward(1) },
    ],
  },

  {
    children: `Vous le souhaitez, mais vous ne controllez rien. C'est au final le hasard qui s'en chargera.`,
    onTap: ({ goForward }) => goForward(1),
  },

  `Vous avez raison d'être passive, car même si la pensée vous effraie, vous ne controllez rien.`,

  `Soudain, vous entendez le craquement du granite qui se dérobe devant vous.
  Une lumière vient alors intensément vous éblouir et vous sortir définitivement de ce long repos.
  Vous la sentez aussi sur votre coprs, nu, comme si vous n'aviez jamais goûté à la vie.`,

  `L'air vous agresse, il vous fouette,
  comme s'il se vangeait, lui aussi, de ne jamais avoir pu vous toucher, durant toutes ces années !
  Ou ces millénaires, qui sait ?`,


  {
    children: `Vous n'avez aucune notion du temps, vos repères sont inexistants, tout est sombre ou néant.
    Vous êtes étrangère à ce que vous vivez, mais vous le savez dangereux. Par quel hasard êtes vous ...
    secourue ou attaquée ?`,
    hint: `Mettre en garde ce qui est venu vous chercher est sans doute la meilleure option,
    mais vous pourriez aussi essayer de puisez dans votre instinct primaire pour des résultats plus divers.`,
    actions: [
      { children: `Mettre en garde`, onClick: ({ goForward }) => goForward() },
      { children: `Puiser dans l'instinct`, onClick: ({ goForward }) => goForward() },
    ],
  },

  {
    children: `Pas de suite pour l'instant. Merci les amis pour le beta test !`,
    readOnly: true,
  },
]];

export default Intro;
