import React from 'react';
import PropTypes from 'prop-types';

function FullTerms({ onClose }) {
  return (
    <React.Fragment>
      <div className='overlay open' />
      <div className='search-sec-text terms-and-conditions full-terms'>
        <img src='/assets/images/green-arrow.svg' onClick={onClose} alt='' />
        <div className='terms-and-conditions-wrapper'>

          <h3>PRIVACY TERMS</h3>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed libero quis leo consequat consectetur. Suspendisse ullamcorper sapien ut lectus auctor auctor. Sed ornare enim arcu, elementum iaculis leo tincidunt in. Donec id erat neque. Phasellus rhoncus, ante sit amet auctor accumsan, mauris urna maximus neque, id pulvinar libero tortor a ante. Phasellus blandit auctor porta. Aenean vitae feugiat tellus, interdum malesuada metus. : </p>

          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Vestibulum eget ipsum a sem fermentum condimentum.</li>
            <li>Quisque maximus leo id fringilla ultrices.</li>
            <li>Cras eu nibh a lorem interdum hendrerit.</li>
          </ul>

          <p>Nullam pulvinar tincidunt lorem, quis ornare velit. Nulla eu velit at sapien iaculis auctor. Ut orci nisl, tempor ac dui sit amet, vestibulum porta sapien. </p>

          <p>Fusce cursus porttitor mi, ullamcorper molestie sapien. Sed suscipit tortor et erat suscipit sollicitudin. Mauris vestibulum blandit tellus, a feugiat mi porta eget.</p>

          <h3>Vivamus bibendum elit est.</h3>

          <p>Pellentesque malesuada augue erat, sit amet venenatis lorem congue faucibus. Nulla ante sapien, porta in enim vitae, fermentum pharetra dui. Nullam porttitor felis eget massa egestas ullamcorper. </p>

          <p>Ut eu nibh metus. Curabitur volutpat diam vel justo dictum bibendum. Integer magna massa, scelerisque accumsan purus non, luctus varius justo. </p>

          <p>Nunc non sodales lacus. Sed vel risus sit amet mauris rhoncus gravida: </p>

          <ul>
            <li>Vivamus porta libero efficitur velit gravida, vitae venenatis sapien imperdiet.</li>
            <li>Suspendisse sit amet ipsum sit amet ligula pulvinar mattis.</li>
          </ul>

          <p>Mauris sollicitudin, est quis ornare vulputate, nisi tellus blandit arcu: </p>

          <ul>
            <li>Aliquam at est semper, tincidunt neque id, ullamcorper elit.</li>
            <li>Sed ut neque eu nunc sagittis malesuada eget tempus neque.</li>
          </ul>

          <p>Fusce egestas nisl quis dui tempor tincidunt. In sit amet mi placerat, consectetur sem nec, hendrerit augue. Curabitur eu tristique urna. Nullam ipsum ex, tempor non sapien sit amet, viverra congue ex. Sed porta urna sit amet consequat dignissim. Praesent efficitur risus odio, ut consequat turpis malesuada non. Donec a massa vehicula, dignissim sem at, malesuada velit.</p>

          <p>Curabitur auctor eros sit amet quam hendrerit dignissim. Maecenas malesuada nisi semper, vestibulum ipsum non, accumsan sapien.</p>

          <h3>Nunc sollicitudin enim magna, posuere iaculis ex mattis vel</h3>

          <p>Curabitur vehicula enim mi, sed venenatis magna dignissim ut. Nam fermentum ullamcorper eros, in finibus risus rutrum ut. Nunc tincidunt pretium elit, sit amet semper ipsum iaculis eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec a mauris ut lorem pulvinar ultricies. Aenean quis dolor tincidunt, rutrum quam non, varius est. Donec venenatis tellus vitae erat efficitur scelerisque. Pellentesque sit amet nisl et est pharetra finibus. Proin bibendum justo lectus, vel imperdiet lacus varius at. Ut ultricies odio eget congue gravida. Nulla facilisi. Morbi in lorem vehicula, faucibus nunc sit amet, euismod velit.</p>
        </div>
      </div>
    </React.Fragment>
  );
}
FullTerms.displayName = 'FullTerms';
FullTerms.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default FullTerms;
