import React from 'react';
import PropTypes from 'prop-types';

function FullTerms({ onClose }) {
  return (
    <React.Fragment>
      <div className='overlay open' />
      <div className='search-sec-text terms-and-conditions full-terms'>
        <img src='/assets/images/green-arrow.svg' onClick={onClose} alt='' />
        <div className='terms-and-conditions-wrapper'>

          <h3>AVISO DE PRIVACIDAD </h3>

          <p>La Secretaría de Salud, con domicilio en Lieja No. 7, Colonia Juárez, Alcaldía Cuauhtémoc, Código Postal 06600, Ciudad de México, en cumplimiento con lo establecido en la Ley Federal de Transparencia y Acceso a la Información Pública Gubernamental, Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados, así como de la normatividad compromisos: </p>

          <ul>
            <li>Los datos que solicitamos en el formulario colocado dentro de nuestra aplicación móvil únicamente serán utilizados para poder establecer contacto contigo en relación a tu petición o comentario; y serán protegidos en términos de las disposiciones jurídicas aplicables. </li>
            <li>Tu petición o comentario podrá ser incluida dentro de los informes estadísticos que se elaboren para el seguimiento de avances institucionales del Gobierno Federal. No obstante, dichos informes serán meramente estadísticos y no incluirán información que permitan identificarte en lo individual. </li>
            <li>Salvo las excepciones previstas en lo señalado en los artículos 22 de la Ley Federal de Transparencia y Acceso a la Información Pública Gubernamental y 120 de la Ley General de Transparencia y Acceso a la Información Pública, tus datos personales podrán ser proporcionados a terceros, adoptando las medidas necesarias que garanticen la seguridad de los datos personales. </li>
            <li>Nos reservamos el derecho a realizar cualquier actualización al presente aviso de privacidad, sin que ello requiera previa notificación. </li>
          </ul>

          <p>La Secretaría de Salud no se responsabiliza del uso o mala utilización del contenido, se reserva el derecho de actualizar, modificar o eliminar la información contenida en sus aplicaciones. </p>

          <p>Tomando en consideración los elementos enunciados en la propuesta anterior, se plantea el siguiente proyecto, que se pone a consideración. </p>

          <h3>AVISO DE PRIVACIDAD INTEGRAL DE LA APLICACIÓN MÓVIL COVID- 19MX </h3>

          <p>La Secretaría de Salud, a través de la Subsecretaria de Prevención y Promoción de la Salud, con domicilio en la calle de Lieja, número 7, colonia Juárez, demarcación territorial Cuauhtémoc, México, código postal 06600, en la Ciudad de México, es la responsable del tratamiento de los datos personales que se recaben a través de la aplicación móvil COVID-19MX, la cual se encuentra disponible para descarga y ejecución en los sistemas operativos iOS y Android; los cuales serán protegidos conforme a lo dispuesto por la Ley General de Protección de Datos Personales en Posesión de  Sujetos Obligados, los Lineamientos Generales de Protección de Datos Personales para el Sector Público y demás normatividad aplicable. </p>

          <p>Los datos personales recolectados por la aplicación móvil COVID- 19MX serán tratados bajo la responsabilidad del sujeto obligado, conforme a sus atribuciones legales y el presente aviso de privacidad. </p>

          <p>Los datos personales recabados a través de la aplicación móvil COVID-19MX, son: </p>

          <ul>
            <li>Nombre, apellidos, género, edad, domicilio y teléfono </li>
            <li>Antecedentes médicos (embarazo, hipertensión, diabetes, obesidad, entre otros) y síntomas actuales </li>
          </ul>

          <p>Las finalidades del tratamiento de los datos personales recabados son: </p>

          <ul>
            <li>Brindar orientación médica a las personas que proporcionaron sus datos para ser contactadas y en su caso atender la situación de emergencia que potencialmente pueda ocasionarse. </li>
            <li>Estadísticos necesarios para que las autoridades sanitarias y epidemiológicas dirijan acciones pertinentes a la enfermedad COVID-19. </li>
          </ul>

          <p>No se recabarán los datos personales de las personas usuarias que no aportan una acumulación de síntomas relacionados con COVID-19. </p>

          <p>La acumulación de datos de sintomatología en relación con los datos personales de los usuarios, son datos sensibles, cuyo tratamiento se sujetará a lo dispuesto por la normativa correspondiente, y con las excepciones previstas en el artículo 22 fracción VII de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados. </p>

          <h3>Fundamento legal para llevar a cabo el tratamiento </h3>

          <p>La Secretaría de Salud trata los datos personales antes señalados con fundamento en los artículos 1° y 39 fracciones I, XVI, XXI y XXVI de la Ley Orgánica de la Administración Pública Federal, así como lo dispuesto en el artículo 10, fracción VI del Reglamento Interior de la Secretaría de Salud, y lo señalado en el artículo primero del Acuerdo por el que se establecen las medidas preventivas que se deberán implementar para la mitigación y control de los riesgos para la salud que implica la enfermedad por el virus SARS-CoV2 (COVID-19), publicado en el Diario Oficial de la Federación el día 24 de marzo de 2020. </p>

          <h3>Mecanismo para ejercer sus derechos de acceso, rectificación, cancelación u oposición de sus datos personales (ARCO) </h3>

          <p>
            {'El titular de los datos podrá ejercer sus derechos ARCO personalmente ante la Unidad de Transparencia de la Secretaría de Salud, con domicilio en Marina Nacional, número 60, Planta Baja, colonia Tacuba, Alcaldía Miguel Hidalgo, México, código postal 11400, en la Ciudad de México, o bien, a través de la Plataforma Nacional de Transparencia en'}
            <a className='privacy-link' target='_blank' rel='noopener noreferrer' href='http://www.plataformadetransparencia.org.mx'>http://www.plataformadetransparencia.org.mx</a>
          </p>

          <h3>Transferencia de datos personales </h3>

          <p>Se podrán transferir sus datos personales a las instituciones de salud que integran el Sistema Nacional de Salud, para dar cumplimiento a las acciones extraordinarias decretadas por la Secretaría de Salud. No se realizarán transferencias adicionales, salvo aquéllas que sean necesarias para atender requerimientos de información de una autoridad competente, en ejercicio de sus atribuciones y que estén debidamente fundados y motivados. </p>

          <h3>Cambios al aviso de privacidad </h3>

          <p>En caso de que existir una modificación a este aviso de privacidad, se notificará a travé de avisos en la aplicación móvil COVID-19MX. </p>

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
