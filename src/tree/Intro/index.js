import ButtonElement from '@react-story-rich/ui/components/Element/Button';
import Navigation from '@react-story-rich/core/classes/Navigation';

import DiceRollElement from 'components/Element/DiceRoll';

const Intro = ['Intro', [
  `Aussi grande soit-elle, chaque civilisation est vouée à disparaître
    et les ruines laissées par nos ancêtres cohabitent avec les monuments de notre ère.
    Mais dans ce vieux monde abîmé par le poids de la guerre fleurit l'audace des Hommes.
    Ils forgent le progrès et laissent une marque parmi leurs pairs.`,

  `Cette aura qui vous entoure me parle,
  elle me montre le destin qui vous accompagne, vous et votre audace.
  Que dis-je ? Les destins ! Du plus court au plus long et du plus sombre au plus sacré...`,

  `Saurez-vous saisir les possibilités tout en préservant votre nature ?
  Parviendrez-vous à protéger les personnes qui vous sont chères ?
  Assumerez-vous les choix que vous allez prendre ?`,

  `Prenez-les sagement, naturellement, égoïstement ou peu importe,
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

  `Ce vieux temple que vous savez au fond d'une jungle dense et magique est votre prison depuis une éternité.
  Vous y demeurez actuellement inerte, sommeillant au coeur de la pierre et au pied d'un monde austère.`,

  `Au coeur de votre tombeau même ! Celui de votre ancienne vie, que vous avez volontairement oubliée.
   Pemettez moi de vous demandez : souhaitez vous vraiment vous réveiller ?`,

  `Aucune réponse n'est acceptable quand vous n'avez guère le choix.
  Vous entendez le craquement du granite qui se dérobe devant vous.`,

  `Une lumière vient alors intensément vous éblouir et vous sortir de ce long repos.
  Vous la sentez aussi sur votre coprs, nu, comme si vous n'aviez jamais goûté à la vie.`,

  `L'air vous agresse, il vous fouette,
  comme s'il se vangeait, lui aussi, de ne jamais avoir pu vous toucher durant toutes ces années !
  Ou ces millénaires, qui sait ?`,

  {
    children: `Vous n'avez aucune notion du temps, vos repères sont inexistants, tout est sombre ou néant.
    Seul votre instinct vous parle, souhaitez vous en revanche lui faire confiance ?`,
    hint: `Le silence est une option valable`,
    timeout: 30000,
    onTimeout: ({ goForward }) => goForward(4),
    actions: [
      { children: `Puiser dans votre instinct`, onClick: Navigation.skip, color: 'secondary' },
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
  de la cime de vos cheveux infiniment longs jusqu'à la voute de vos pieds doux et fragiles.
  Vous êtes celle que l'on appelait Empathie, cela vous revient, dernière Naïade de ce temple de l'eau qui fut mis
  en sommeil avant son invasion.`,

  `Nul n'avait osé jusqu'ici profaner les tombes,
  ou peut-être nul n'avait réussi à progresser aussi loin dans le temple sans se faire tuer.`,

  `Vous décidez de vous relever, sans un tissu pour combler votre besoin de pudeur.
  Celle-ci devra attendre, car se tient devant vous trois aventuriers
  dont les expressions sont, à votre étonnement, aussi perplexes que la votre.`,

  {
    character: 'worrick',
    children: `« Et bien Jakker ! C'est le trésor que tu recherchais j'espère... »
    dit l'un des trois en s'adressant à son accolyte.`,
    onTap: Navigation.skip,
  },

  `Ce dernier, un humain vêtu d'une l'armure légère est le plus grand de la bande.
  Son visage légèrement carré s'habille d'une petite barbe taillée et ses cheveux, bruns et ondulés
  sont d'une propreté rare en ce monde. Encore moins communes sont les lunettes rondes qui trahissent sa classe.
  Il est manifestement l'érudit, vous présumez.`,

  `Son interlocuteur est quant à lui le plus petit des trois.
  Sur son visage se dessinent des traits durs et renfermés.
  Une voluptueuse barbe grise vient parfaire l'observation : c'est un nain !
  Son armure solide, mais loin d'être massive se complete d'un large bouclier ovoïde.
  Aucune arme n'occupe étonnament son attirail pourvu de sacoches de toutes tailles.`,

  `Le dernier se tient plus en retrait. Il s'agit en fait d'une femme, dont les oreilles longues et pointues
  la qualifie certainement d'elfe. Vous la distinguez très clairement prête à vous attaquer.
  Son arc bandé au maximum, vous sentez toute la tension dans ses muscles. Un simple mouvement de doigts
  pourrait vous valoir une flèche fatale à votre situation sans défense.`,

  {
    character: 'Jakker',
    children: `« Pam, je ne crois pas qu'elle présente un danger. Tempérons la situation »
    ordonne calmement le nain, d'une voix roque et sage.`,
    onTap: Navigation.skip,
  },

  `L'archère s'exécute sans dire un mot. Vous êtes témoin de l'ordre et de la rigueur de ceux qui estiment que vous
  ne leur êtes pas une menace.`,

  {
    children: `Toujours muette, l'elfe sort une tenue qu'elle jette en votre direction`,
    timeout: 30000,
    onTimeout: ({ goForward }) => goForward(1),
    actions: [
      { children: `Vous l'équipez`, onClick: ({ goForward }) => goForward(2) },
      { children: `Vous le refusez`, onClick: Navigation.skip },
    ],
  },

  {
    character: 'Pam',
    children: `« Ce n'est pas optionel » dit-elle pour agacée.`,
    onTap: ({ goForward }) => goForward(1),
  },

  {
    character: 'Pam',
    children: `« C'est une de mes tenues de rechange »
    dit-elle pour vous rassurer.`,
    onTap: Navigation.skip,
  },

  `Vous enfilez le grossier tissu qu'elle vous a poliement donné.`,

  {
    children: `De quelle nature sont les premiers mots que vous souhaitez leur adresser ?`,
    hint: `Choisir la nature "Opportune" déclenchera un test d'habilité.`,
    actions: [
      { children: `Amicale`, onClick: ({ goForward }) => goForward(4) },
      { children: `Neutre`, onClick: ({ goForward }) => goForward(3) },
      { children: `Hostile`, onClick: ({ goForward }) => goForward(2) },
      { children: `Opportune`, onClick: Navigation.skip, color: 'secondary' },
    ],
  },

  {
    Element: DiceRollElement,
    query: '1d20>=10',
    skill: 'INT',
    onFailure: ({ goForward }) => goForward(1),
    onSuccess: Navigation.skip,
  },

  {
    character: 'Empathie',
    children: `Avec une imprésionnant sagesse, vous leur dîtes : 
    « Vous ignorez peut-être tout de ces lieux, ou vous en savez tous les recoins.
    Une chose est sûre, il n'est profitable à aucun d'entre-nous de s'éterniser ici.
    Il me parait inconcevable d'être la seule à m'être réveillez dans ce rafus. 
    Allons-nous en avant que plus fort ne nous trouve...»`,
    onTap: Navigation.skip,
  },

  {
    character: 'Empathie',
    children: `« Vous n'avez aucune honte de venir profanez ce lieu sacré ! »
    lancez-vous abruptement.`,
    onTap: Navigation.skip,
  },

  {
    character: 'Empathie',
    children: `« Je n'ai aucune raison de vous faire confiance, mais je n'ai pas vraiment le choix. »`,
    onTap: Navigation.skip,
  },

  {
    character: 'Empathie',
    children: `« Merci pour les vêtements » vous leur dîtes.
    « Je souhaite collaborer. Tout me parait nouveau et mes sens sont saturés.
    Aidez-moi et peut-être que je pourrais un jour vous rendre l'appareil... »`,
    onTap: Navigation.skip,
  },

  {
    children: `Pas de suite pour l'instant. Merci les amis pour le beta test !`,
    readOnly: true,
  },
]];

export default Intro;
