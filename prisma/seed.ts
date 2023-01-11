/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const technologies = [
  'react',
  'node',
  'mongodb',
  'python',
  'sql',
  'R',
  'matlab',
  'c#',
  'java',
];

const generateRandomTags = (quantity?: number) => {
  const shuffled = technologies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, quantity);
};

const projectData = [
  {
    title: 'Domainer',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/rohitdasu/projectmate',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',
    tags: generateRandomTags(3),
  },
  {
    title: 'Mat Lam Tam',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/rohitdasu/projectmate',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Vagram',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/nuxt/nuxt.js',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',
    tags: generateRandomTags(3),
  },
  {
    title: 'Voltsillam',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/pocketbase/pocketbase',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',
    tags: generateRandomTags(3),
  },
  {
    title: 'Voltsillam',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/danielgindi/Charts',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Holdlamis',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://mashable.com/sollicitudin/ut/suscipit/a/feugiat/et/eros.jsp?orci=dictumst&pede=aliquam&venenatis=augue&non=quam&sodales=sollicitudin&sed=vitae&tincidunt=consectetuer',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Bitwolf',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://discuz.net/etiam/vel.xml?sed=nulla&sagittis=facilisi&nam=cras&congue=non&risus=velit&semper=nec&porta=nisi&volutpat=vulputate&quam=nonummy&pede=maecenas&lobortis=tincidunt',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Latlux',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://artisteer.com/ante/vivamus/tortor.jsp?magnis=aliquam&dis=convallis&parturient=nunc&montes=proin&nascetur=at&ridiculus=turpis&mus=a&etiam=pede&vel=posuere&augue=nonummy&vestibulum=integer&rutrum=non&rutrum=velit&neque=donec&aenean=diam&auctor=neque&gravida=vestibulum&sem=eget&praesent=vulputate&id=ut&massa=ultrices&id=vel&nisl=augue&venenatis=vestibulum&lacinia=ante&aenean=ipsum&sit=primis&amet=in&justo=faucibus&morbi=orci&ut=luctus&odio=et&cras=ultrices&mi=posuere&pede=cubilia&malesuada=curae&in=donec&imperdiet=pharetra&et=magna&commodo=vestibulum&vulputate=aliquet',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',
    tags: generateRandomTags(3),
  },
  {
    title: 'Job',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'http://princeton.edu/phasellus/in.jsp?eget=id&congue=turpis&eget=integer&semper=aliquet&rutrum=massa&nulla=id&nunc=lobortis&purus=convallis&phasellus=tortor&in=risus&felis=dapibus&donec=augue&semper=vel&sapien=accumsan&a=tellus&libero=nisi&nam=eu&dui=orci&proin=mauris&leo=lacinia&odio=sapien&porttitor=quis&id=libero&consequat=nullam&in=sit&consequat=amet&ut=turpis&nulla=elementum&sed=ligula&accumsan=vehicula&felis=consequat&ut=morbi&at=a&dolor=ipsum&quis=integer&odio=a&consequat=nibh&varius=in&integer=quis',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Biodex',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://cnbc.com/luctus/et/ultrices/posuere/cubilia/curae.aspx?vivamus=erat&in=nulla&felis=tempus&eu=vivamus&sapien=in&cursus=felis&vestibulum=eu&proin=sapien&eu=cursus&mi=vestibulum&nulla=proin&ac=eu&enim=mi&in=nulla&tempor=ac&turpis=enim&nec=in&euismod=tempor&scelerisque=turpis&quam=nec&turpis=euismod&adipiscing=scelerisque&lorem=quam&vitae=turpis&mattis=adipiscing&nibh=lorem&ligula=vitae&nec=mattis&sem=nibh&duis=ligula&aliquam=nec&convallis=sem&nunc=duis&proin=aliquam&at=convallis&turpis=nunc&a=proin&pede=at&posuere=turpis&nonummy=a&integer=pede&non=posuere&velit=nonummy&donec=integer&diam=non&neque=velit&vestibulum=donec&eget=diam&vulputate=neque&ut=vestibulum&ultrices=eget&vel=vulputate&augue=ut&vestibulum=ultrices&ante=vel&ipsum=augue&primis=vestibulum&in=ante&faucibus=ipsum&orci=primis&luctus=in&et=faucibus&ultrices=orci&posuere=luctus&cubilia=et&curae=ultrices&donec=posuere&pharetra=cubilia&magna=curae&vestibulum=donec&aliquet=pharetra&ultrices=magna&erat=vestibulum&tortor=aliquet&sollicitudin=ultrices&mi=erat&sit=tortor&amet=sollicitudin&lobortis=mi&sapien=sit&sapien=amet&non=lobortis&mi=sapien&integer=sapien&ac=non&neque=mi&duis=integer&bibendum=ac&morbi=neque&non=duis&quam=bibendum&nec=morbi&dui=non&luctus=quam',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Bigtax',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'http://lycos.com/gravida/sem/praesent/id/massa.js?risus=in&auctor=felis&sed=eu&tristique=sapien&in=cursus&tempus=vestibulum&sit=proin&amet=eu&sem=mi&fusce=nulla&consequat=ac&nulla=enim&nisl=in&nunc=tempor&nisl=turpis&duis=nec&bibendum=euismod&felis=scelerisque&sed=quam&interdum=turpis&venenatis=adipiscing&turpis=lorem&enim=vitae&blandit=mattis&mi=nibh&in=ligula&porttitor=nec&pede=sem&justo=duis&eu=aliquam&massa=convallis&donec=nunc&dapibus=proin&duis=at&at=turpis&velit=a&eu=pede&est=posuere&congue=nonummy&elementum=integer&in=non&hac=velit&habitasse=donec&platea=diam&dictumst=neque&morbi=vestibulum&vestibulum=eget&velit=vulputate&id=ut&pretium=ultrices&iaculis=vel&diam=augue&erat=vestibulum&fermentum=ante&justo=ipsum&nec=primis&condimentum=in&neque=faucibus&sapien=orci&placerat=luctus&ante=et&nulla=ultrices&justo=posuere&aliquam=cubilia&quis=curae&turpis=donec&eget=pharetra&elit=magna&sodales=vestibulum&scelerisque=aliquet&mauris=ultrices&sit=erat&amet=tortor&eros=sollicitudin&suspendisse=mi&accumsan=sit&tortor=amet&quis=lobortis&turpis=sapien&sed=sapien&ante=non&vivamus=mi&tortor=integer&duis=ac&mattis=neque&egestas=duis&metus=bibendum&aenean=morbi&fermentum=non&donec=quam&ut=nec&mauris=dui&eget=luctus&massa=rutrum',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Sub-Ex',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://tiny.cc/arcu/sed.png?pretium=suscipit&quis=nulla&lectus=elit&suspendisse=ac&potenti=nulla&in=sed&eleifend=vel&quam=enim&a=sit&odio=amet&in=nunc&hac=viverra&habitasse=dapibus&platea=nulla&dictumst=suscipit&maecenas=ligula&ut=in&massa=lacus&quis=curabitur&augue=at&luctus=ipsum&tincidunt=ac&nulla=tellus&mollis=semper&molestie=interdum&lorem=mauris&quisque=ullamcorper&ut=purus&erat=sit',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Tampflex',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://mapquest.com/justo/in/blandit/ultrices/enim/lorem/ipsum.js?curabitur=blandit&convallis=non&duis=interdum&consequat=in&dui=ante&nec=vestibulum&nisi=ante&volutpat=ipsum&eleifend=primis&donec=in&ut=faucibus&dolor=orci&morbi=luctus&vel=et&lectus=ultrices&in=posuere&quam=cubilia&fringilla=curae&rhoncus=duis',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Redhold',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://mediafire.com/fusce/congue/diam/id.png?justo=sapien&in=iaculis&hac=congue&habitasse=vivamus&platea=metus&dictumst=arcu&etiam=adipiscing&faucibus=molestie',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Ronstring',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/hoppscotch/hoppscotch',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Trippledex',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/dotnet/core',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Alphazap',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://github.com/trending#:~:text=Star-,malwaredllc%20/%20byob,-An%20open%2Dsource',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Treeflex',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository:
      'https://github.com/trending#:~:text=Star-,malwaredllc%20/%20byob,-An%20open%2Dsource',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',

    tags: generateRandomTags(3),
  },
  {
    title: 'Prodder',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/remix-run/react-router',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',
    tags: generateRandomTags(3),
  },
  {
    title: 'It',
    description:
      'This project will acts a a medium in between contributors and maintainers of different project where everyone can come together and work in open source with more ease.',
    content: '',
    githubRepository: 'https://github.com/ethereum/ethereum-org-website',
    coverImg: 'https://miro.medium.com/max/1400/1*htbUdWgFQ3a94PMEvBr_hQ.png',
    tags: generateRandomTags(3),
  },
];

async function main() {
  await prisma.$connect();
  await prisma.user.upsert({
    where: {
      email: 'johndio@test.com',
    },
    update: {},
    create: {
      email: 'johndio@test.com',
      name: 'John Dio',
      image: null,
      emailVerified: null,
      project: {
        create: projectData,
      },
    },
  });
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
