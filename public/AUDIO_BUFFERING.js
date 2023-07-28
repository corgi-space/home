class AudioBufferingProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    // 在这里编写你的音频处理代码

    // 例如，若要直接传递音频而不进行处理：
    this.port.postMessage(inputs[0][0]);

    return true;
  }
}

registerProcessor('AUDIO_BUFFERING', AudioBufferingProcessor);