<template>
  <!-- ...existing code... -->

  <section class="contact">
    <h2>Contact Us</h2>

    <!-- Netlify form -->
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="contact-form"
    >
      <!-- required hidden input for Netlify -->
      <input type="hidden" name="form-name" value="contact" />

      <!-- honeypot - keep hidden -->
      <p class="hidden">
        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
      </p>

      <p>
        <label for="name">Name</label><br />
        <input id="name" type="text" name="name" required />
      </p>

      <p>
        <label for="email">Email</label><br />
        <input id="email" type="email" name="email" required />
      </p>

      <p>
        <label for="message">Message</label><br />
        <textarea id="message" name="message" rows="6" required></textarea>
      </p>

      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </section>

  <!-- ...existing code... -->
</template>

<script>
export default {
  name: 'TestContact',
  // ...existing code...
}
</script>

<style scoped>
/* ...existing code... */
.hidden { display: none; }
.contact { max-width: 640px; margin: 2rem auto; padding: 1rem; }
.contact-form input,
.contact-form textarea { width: 100%; box-sizing: border-box; padding: 0.5rem; }
.contact-form button { padding: 0.6rem 1rem; }
</style>