<template>
  <div class="p-field input-field">
    <label
      v-if="isLabelPresent"
      :for="inputId"
      class="input-field__label"
      :class="{
        'input-field__light-colored-label' : lightColored
      }"
    >
      {{ label }}
    </label>
    <div class="input-field__row">
      <div class="input-field__column">
        <div class="input-field__row">
          <Password
            class="input-field__input"
            :class="{
              'p-invalid' : error
            }"
            v-if="type === 'password'"
            v-model="value"
            :id="inputId"
            :aria-describedby="`${inputId}-help`"
            :feedback="false"
            :autocomplete="autocomplete"
            :disabled="disabled"
            @keyup="updateValue"
          />
          <InputText
            class="input-field__input"
            :class="{
              'p-invalid' : error
            }"
            v-else
            type="text"
            v-model="value"
            :id="inputId"
            :aria-describedby="`${inputId}-help`"
            :autocomplete="autocomplete"
            :disabled="disabled"
            @keyup="updateValue"
            :placeholder="placeholder"
          />
          <Button
            class="input-field__button"
            :class="{
              'p-button-secondary' : buttonTheme === 'secondary'
            }"
            v-if="isButtonPresent"
            type="button"
            :label="buttonLabel"
            @click="submit"
          />
        </div>
        <small
          :id="`${inputId}-help`"
          v-if="isHelpTextPresent"
          :class="{
            'p-error' : error,
            'input-field__light-colored-help-text' : lightColored
          }"
        >
          {{ helpText }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { isNil } from "lodash";

export default {
  name: "InputField",
  components: {
    Password,
    InputText,
    Button
  },
  props: {
    inputId: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    helpText: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    value: [String, Number],
    autocomplete: {
      type: String,
      default: "off"
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lightColored: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    buttonLabel: {
      type: String
    },
    buttonTheme: {
      type: String
    }
  },
  emits: ["update", "submit"],
  computed: {
    isLabelPresent() {
      return !isNil(this.label);
    },
    isHelpTextPresent() {
      return !isNil(this.helpText);
    },
    isButtonPresent() {
      return !isNil(this.buttonLabel);
    }
  },
  methods: {
    updateValue(event) {
      console.log(event);
      this.$emit("update", event.target.value);
    },
    submit() {
      this.$emit("submit");
    }
  }
}
</script>

<style lang="scss" scoped>
.input-field {

  &__label {
    font-weight: bold;
  }

  &__input {
    position: relative;
  }

  &__light-colored-label {
    color: white;
  }

  &__light-colored-help-text {
    color: white;
  }

  &__row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__column {
    width: 100%;
  }

  &__button {
    margin-left: 0.5rem;
  }
}
</style>