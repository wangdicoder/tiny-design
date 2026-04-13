import React from 'react';
import { ScrollIndicator } from '@tiny-design/react';

export default function TargetDemo() {
  const targetRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollIndicator fixed={false} target={() => targetRef.current ?? window} />
      <div ref={targetRef} style={{overflowY: 'scroll', height: 200}}>
        <p><b>Scroll up to detect the change of the indicator.</b></p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum iaculis eu non. Malesuada proin libero nunc consequat interdum varius sit amet mattis. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Erat nam at lectus urna duis convallis convallis tellus id. Ornare quam viverra orci sagittis eu volutpat odio facilisis. Ornare arcu dui vivamus arcu. Convallis aenean et tortor at. Tempus iaculis urna id volutpat lacus. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Lectus sit amet est placerat in egestas erat imperdiet sed. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Non nisi est sit amet facilisis magna etiam tempor orci. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Gravida arcu ac tortor dignissim. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Etiam tempor orci eu lobortis elementum nibh tellus. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus.</p>

        <p>Nec tincidunt praesent semper feugiat nibh sed. Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor. Magna eget est lorem ipsum dolor. Arcu risus quis varius quam quisque id diam vel quam. Massa id neque aliquam vestibulum. Libero id faucibus nisl tincidunt eget. Consectetur adipiscing elit ut aliquam purus sit. Pellentesque diam volutpat commodo sed egestas egestas. Interdum velit laoreet id donec ultrices tincidunt. Fringilla urna porttitor rhoncus dolor purus. Et ultrices neque ornare aenean. Vitae ultricies leo integer malesuada nunc. A diam sollicitudin tempor id eu nisl nunc mi ipsum. Neque viverra justo nec ultrices dui sapien eget mi. Dictum non consectetur a erat nam at lectus. Aenean sed adipiscing diam donec adipiscing tristique risus nec.</p>

        <p>Mi quis hendrerit dolor magna eget est lorem. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Adipiscing diam donec adipiscing tristique risus. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Dui ut ornare lectus sit amet est. Nunc eget lorem dolor sed. Ac turpis egestas integer eget aliquet nibh praesent tristique. Mattis molestie a iaculis at erat pellentesque adipiscing. Est ullamcorper eget nulla facilisi etiam dignissim. Arcu ac tortor dignissim convallis. Orci ac auctor augue mauris. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Amet commodo nulla facilisi nullam vehicula ipsum. Amet risus nullam eget felis eget. Et sollicitudin ac orci phasellus. Ultrices mi tempus imperdiet nulla. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Diam vulputate ut pharetra sit. Suspendisse potenti nullam ac tortor vitae purus faucibus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit.</p>
      </div>
    </>
  );
}
