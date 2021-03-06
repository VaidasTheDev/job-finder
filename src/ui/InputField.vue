<template>
  <div class="p-field input-field">
    <label
      v-if="isLabelPresent()"
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
            v-if="type === 'password'"
            v-bind="$attrs"
            :value="modelValue"
            @input="onInput($event)"
            class="input-field__input"
            :class="{
              'p-invalid' : error
            }"
            :id="inputId"
            :aria-describedby="`${inputId}-help`"
            :feedback="false"
            :autocomplete="autocomplete"
            :disabled="disabled"
          />
          <InputText
            v-else
            v-bind="$attrs"
            :value="modelValue"
            @input="onInput($event)"
            class="input-field__input"
            :class="{
              'p-invalid' : error
            }"
            type="text"
            :id="inputId"
            :aria-describedby="`${inputId}-help`"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :placeholder="placeholder"
          />
          <Button
            v-if="isButtonPresent()"
            class="input-field__button"
            :class="{
              'p-button-secondary' : buttonTheme === 'secondary'
            }"
            type="button"
            :label="buttonLabel"
            :icon="buttonIcon"
            :disabled="disabled"
            @click="submit($event)"
          />
        </div>
        <small
          :id="`${inputId}-help`"
          v-if="isHelpTextPresent()"
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
import { isNil } from "lodash";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

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
    modelValue: {
      type: String,
      default: ""
    },
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
    },
    buttonIcon: {
      type: String
    }
  },
  emits: ["update:modelValue", "submit"],
  methods: {
    isButtonPresent() {
      return !isNil(this.buttonLabel);
    },
    isLabelPresent() {
      return !isNil(this.label);
    },
    isHelpTextPresent() {
      return !isNil(this.helpText);
    },
    onInput(event) {
      if (event.target) {
        this.$emit("update:modelValue", event.target.value);
      }
    },
    submit(event) {
      if (this) {
        this.$emit("submit", event);
      }
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